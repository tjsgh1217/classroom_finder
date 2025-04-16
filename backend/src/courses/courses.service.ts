import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

interface RawCourse {
  courseId: string;
  department: string;
  courseName: string;
  time: string; // 원본 CSV의 time
  room: string; // 원본 CSV의 room
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

  async findCoursesByRoom(room: string): Promise<CourseWithTime[]> {
    const { Items } = await this.db.send(
      new ScanCommand({ TableName: this.TABLE }),
    );
    const raw = Items as RawCourse[];
    const filtered = raw.filter(r => r.room.split('/').includes(room));
    const seen = new Set<string>();
    const result: CourseWithTime[] = [];

    for (const r of filtered) {
      const key = `${r.courseId}|${r.time}|${r.room}`;
      if (seen.has(key)) continue;
      seen.add(key);

      result.push({
        courseId: r.courseId,
        department: r.department,
        courseName: r.courseName,
        time: r.time,
        room: r.room,
      });
    }

    return result;
  }
}