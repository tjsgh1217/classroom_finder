import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

interface RawCourse {
  courseId: string;
  department: string;
  courseName: string;
  time: string; 
  room: string; 
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
  time: string; 
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

  private parseSchedule(row: RawCourse): ScheduleItem[] {
    const tokenPattern = /([월화수목금]\w+)|(\d+)/g;
    const tokens = row.time.replace(/\s+/g, '').match(tokenPattern) ?? [];
    const rooms = row.room.replace(/\s+/g, '').split('/');

    const sched: ScheduleItem[] = [];
    let prevDay: string | null = null;
    let roomIndex = 0;

    for (const token of tokens) {
      let dayKr: string | null = null;
      let period: string;
      const m = token.match(/^([월화수목금])(.+)$/);
      if (m) {
        dayKr = m[1];
        period = m[2]; 
        if (prevDay && dayKr !== prevDay) {
          roomIndex = Math.min(roomIndex + 1, rooms.length - 1);
        }
        prevDay = dayKr;
      } else if (prevDay) {
        dayKr = prevDay;
        period = token;
      } else {
        continue;
      }
      const room = rooms[roomIndex] ?? rooms.at(-1);
      sched.push({ dayKr, period, room });
    }
    return sched;
  }

  async findBlockByRoom(room: string): Promise<CourseWithTime[]> {
    const { Items } = await this.db.send(
      new ScanCommand({ TableName: this.TABLE })
    );
    const raw = Items as RawCourse[];
    const out: CourseWithTime[] = [];

    for (const r of raw) {
      if (!r.room.replace(/\s+/g, '').split('/').includes(room)) continue;
      const sched = this.parseSchedule(r).filter(s => s.room === room);
      const groups: Record<string, string[]> = {};
      sched.forEach(s => {
        (groups[s.dayKr] ||= []).push(s.period);
      });
      
      for (const [dayKr, periods] of Object.entries(groups)) {
        out.push({
          courseId: r.courseId,
          department: r.department,
          courseName: r.courseName,
          time: `${dayKr}${periods.join('/')}`,
          room,
        });
      }
    }

    const order: Record<string, number> = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
    out.sort((a, b) => {
      const dA = a.time.charAt(0);
      const dB = b.time.charAt(0);
      return (order[dA] ?? 5) - (order[dB] ?? 5);
    });
    return out;
  }
}