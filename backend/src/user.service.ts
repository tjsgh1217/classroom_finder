import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly dynamoDb: DynamoDB.DocumentClient;
  private readonly TABLE_NAME = process.env.USERS_TABLE || 'Users';

  constructor() {
    // AWS 리전을 환경변수나 기본값으로 설정
    this.dynamoDb = new DynamoDB.DocumentClient({
      region: process.env.AWS_REGION || 'ap-northeast-2',
    });
  }

  // 회원가입 메서드
  async signUp(email: string, password: string) {
    // 이미 사용자가 있는지 확인
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 존재하는 사용자입니다.');
    }
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // DynamoDB에 사용자 정보 저장
    await this.dynamoDb
      .put({
        TableName: this.TABLE_NAME,
        Item: newUser,
      })
      .promise();

    return { message: '회원가입 성공' };
  }

  // 로그인 메서드
  async login(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('잘못된 자격 증명입니다.');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('잘못된 자격 증명입니다.');
    }
    // JWT 발급 (유효기간 1시간)
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });
    return { accessToken: token };
  }

  // DynamoDB에서 이메일로 사용자 조회
  async getUserByEmail(email: string): Promise<any> {
    const result = await this.dynamoDb
      .get({
        TableName: this.TABLE_NAME,
        Key: { email },
      })
      .promise();
    return result.Item;
  }
}