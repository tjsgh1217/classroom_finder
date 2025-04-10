import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class UserService {
  private readonly db: DynamoDBDocumentClient;
  private readonly TABLE_NAME = process.env.USERS_TABLE || 'Users';

  constructor() {
    // 1) 기본 DynamoDBClient 생성
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    // 2) DocumentClient 스타일 래퍼 생성
    this.db = DynamoDBDocumentClient.from(client);
  }

  // 회원가입
  async signUp(email: string, password: string) {
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // v3 방식: PutCommand 사용
    await this.db.send(
      new PutCommand({
        TableName: this.TABLE_NAME,
        Item: newUser,
      }),
    );

    return { message: '회원가입 성공' };
  }

  // 로그인
  async login(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('잘못된 자격 증명입니다.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('잘못된 자격 증명입니다.');
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' },
    );
    return { accessToken: token };
  }

  // 이메일로 사용자 조회
  async getUserByEmail(email: string): Promise<any> {
    const result = await this.db.send(
      new GetCommand({
        TableName: this.TABLE_NAME,
        Key: { email },
      }),
    );
    return result.Item;
  }
}