import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class CoursesService {
  private readonly db: DynamoDBDocumentClient;
  private readonly TABLE = 'Courses';

  constructor() {
    const client = new DynamoDBClient({ region: process.env.AWS_REGION });
    this.db = DynamoDBDocumentClient.from(client);
  }

  async findCourses(filters: { room?: string; day?: string }) {
    // 단순 예시: Scan + FilterExpression
    const expr: string[] = [];
    const names: any = {};
    const values: any = {};
    if (filters.room) {
      expr.push('#room = :room');
      names['#room'] = 'room';
      values[':room'] = filters.room;
    }
    if (filters.day) {
      expr.push('contains(#time, :day)');
      names['#time'] = 'time';
      values[':day'] = filters.day;
    }
    const params: any = { TableName: this.TABLE };
    if (expr.length) {
      params.FilterExpression = expr.join(' AND ');
      params.ExpressionAttributeNames = names;
      params.ExpressionAttributeValues = values;
    }
    const { Items } = await this.db.send(new ScanCommand(params));
    return Items;
  }
}