import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

interface RawCourse {
  courseId: string;
  department: string;
  courseName: string;
  time: string; // 예: "월2/3목5/6", "수2/3/4", "월4/목5" 등
  room: string; // 예: "090520-0" 또는 "090520-0/090525-0/090530-0"
}

interface ScheduleItem {
  dayKr: string;
  period: string;
  room: string;
}

export interface CourseWithTime {
  courseId: string;
  department: string;
  courseName: string;
  time: string;  // 예: "월2/3" 또는 "목5/6"
  room: string;
}

@Injectable()
export class CoursesService {
  private readonly db: DynamoDBDocumentClient;
  private readonly TABLE = 'Courses';

  constructor() {
    const client = new DynamoDBClient({ region: process.env.AWS_REGION });
    this.db = DynamoDBDocumentClient.from(client);
  }

  /**
   * CSV의 time 필드(예: "월2/3목5/6")를 파싱하여 ScheduleItem[] 배열로 만듭니다.
   *
   * - 먼저 공백을 제거하고 정규식을 이용하여 토큰 배열을 만듭니다.
   *   토큰 패턴은 "요일+교시" 또는 단순 교시(숫자나 영문)로 합니다.
   *   예: "월2/3목5/6" → tokens: ["월2", "3", "목5", "6"]
   * - 순회하면서 토큰이 요일+교시("월2")이면 새로운 블록으로 간주하여
   *   이전 토큰이 있었다면 roomIndex를 증가시킵니다.
   * - 단순 교시("3","6") 토큰은 바로 이전의 요일(currentDay)을 재사용합니다.
   */
  private parseSchedule(row: RawCourse): ScheduleItem[] {
    // 공백 제거 후 tokens 배열 생성
    const rawStr = row.time.replace(/\s+/g, '');
    // 정규식: 요일+교시 또는 단순 숫자(또는 영문)로 매칭
    // [월화수목금]\w+  → "월2", "목5" 등
    // \d+             → "3", "6" 등
    const tokens = rawStr.match(/[월화수목금]\w+|\d+/g) ?? [];
    // room 필드는 '/'로 분리
    const rooms = row.room.replace(/\s+/g, '').split('/');

    const sched: ScheduleItem[] = [];
    let prevDay: string | null = null;
    let roomIndex = 0;

    for (const token of tokens) {
      let dayKr: string | null = null;
      let period: string;
      // 토큰이 "요일+교시" 형식이면
      const m = token.match(/^([월화수목금])(.+)$/);
      if (m) {
        dayKr = m[1];       // 예: "월" 또는 "목"
        period = m[2];      // 예: "2" 또는 "5"
        // 새 토큰에서 요일 문자가 등장하면, 
        // 첫 토큰은 roomIndex 유지, 이후부터는 새 블록으로 처리(동일 요일이어도)
        if (prevDay !== null) {
          roomIndex = Math.min(roomIndex + 1, rooms.length - 1);
        }
        prevDay = dayKr;
      } else if (prevDay) {
        // 토큰이 단순 교시인 경우
        dayKr = prevDay;
        period = token;
      } else {
        // 첫 토큰이 요일 없이 시작하면 무시합니다.
        continue;
      }
      const room = rooms[roomIndex] ?? rooms.at(-1);
      sched.push({ dayKr, period, room });
    }
    return sched;
  }

  /**
   * 강의실(room) 기준으로 각 RawCourse의 스케줄을 파싱 및 그룹핑하여,
   * "요일 + 교시들" 형태의 데이터를 반환합니다.
   *
   * 그룹핑 시에는 (요일, room) 조합을 키로 사용합니다.
   * 예를 들어, 토큰들이 아래와 같이 파싱됐다면:
   *   [
   *     { dayKr: "월", period: "3", room: "roomA" },
   *     { dayKr: "월", period: "4", room: "roomA" },
   *     { dayKr: "월", period: "6", room: "roomB" }
   *   ]
   * 그룹은 { "월_roomA": ["3", "4"], "월_roomB": ["6"] }가 되어,
   * 최종 결과는 각각 { time: "월3/4", room: "roomA" }와 { time: "월6", room: "roomB" }로 반환됩니다.
   */
  async findBlockByRoom(room: string): Promise<CourseWithTime[]> {
    const { Items } = await this.db.send(
      new ScanCommand({ TableName: this.TABLE })
    );
    const raw = Items as RawCourse[];
    const out: CourseWithTime[] = [];

    for (const r of raw) {
      // 해당 레코드의 room 필드에 요청한 room 값이 포함되어 있지 않으면 패스
      if (!r.room.replace(/\s+/g, '').split('/').includes(room)) continue;

      // 파싱된 스케줄 항목 중 요청 room에 해당하는 항목 필터링
      const sched = this.parseSchedule(r).filter(s => s.room === room);
      // (요일, room) 단위로 그룹핑 (여기서는 room이 동일하므로 키에 room도 포함)
      const groups: Record<string, string[]> = {};
      sched.forEach(s => {
        const key = `${s.dayKr}_${s.room}`;
        (groups[key] ||= []).push(s.period);
      });

      // 그룹별로 최종 CourseWithTime 객체 생성
      for (const key in groups) {
        const [dayKr, roomKey] = key.split('_');
        out.push({
          courseId: r.courseId,
          department: r.department,
          courseName: r.courseName,
          time: `${dayKr}${groups[key].join('/')}`,
          room: roomKey,
        });
      }
    }

    // 요일 순서로 정렬 (월, 화, 수, 목, 금)
    const order: Record<string, number> = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
    out.sort((a, b) => {
      const dA = a.time.charAt(0);
      const dB = b.time.charAt(0);
      return (order[dA] ?? 5) - (order[dB] ?? 5);
    });
    return out;
  }
}