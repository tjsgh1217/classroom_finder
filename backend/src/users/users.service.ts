import { Injectable, NotFoundException } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class UsersService {
  private readonly db: DynamoDBDocumentClient;
  private readonly TABLE = process.env.USERS_TABLE || 'Users';

  constructor() {
    const client = new DynamoDBClient({ region: process.env.AWS_REGION });
    this.db = DynamoDBDocumentClient.from(client);
  }

  // studentId 로 조회
  async findByStudentId(studentId: string) {
    const { Item } = await this.db.send(
      new GetCommand({
        TableName: this.TABLE,
        Key: { studentId },
      }),
    );
    if (!Item) throw new NotFoundException('User not found');
    return Item;
  }
}