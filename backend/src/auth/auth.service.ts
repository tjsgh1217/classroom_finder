import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

interface User {
  studentId: string;
  password: string;
  name: string;
  department: string;
  createdAt?: string;
}

@Injectable()
export class AuthService {
  private readonly db: DynamoDBDocumentClient;
  private readonly tableName: string;
  private readonly jwtSecret: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION') || 'ap-northeast-2';
    this.tableName = this.configService.get<string>('USERS_TABLE') || 'Users';
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') || 'MY_SECRET';

    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID')!;
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!;

    const client = new DynamoDBClient({ region, credentials: { accessKeyId, secretAccessKey } });
    this.db = DynamoDBDocumentClient.from(client);
  }

  /** 회원가입 */
  async signUp(studentId: string, password: string, name: string, department: string) {
    if (await this.getUser(studentId)) {
      throw new ConflictException('이미 등록된 학번입니다.');
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser: User = {
      studentId,
      password: hashed,
      name,
      department,
      createdAt: new Date().toISOString(),
    };

    await this.db.send(
      new PutCommand({
        TableName: this.tableName,
        Item: newUser,
      }),
    );

    return { message: '회원가입 성공' };
  }

  /** 로그인 */
  async login(studentId: string, password: string) {
    const user = await this.getUser(studentId);
    if (!user) {
      throw new UnauthorizedException('학번 또는 비밀번호가 올바르지 않습니다.');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('학번 또는 비밀번호가 올바르지 않습니다.');
    }
    const token = jwt.sign({ studentId, name: user.name }, this.jwtSecret, { expiresIn: '1h' });
    return {
      message: '로그인 성공',
      accessToken: token,
      user: { studentId: user.studentId, name: user.name, department: user.department },
    };
  }

  /** 비밀번호 변경 */
  async changePassword(studentId: string, oldPassword: string, newPassword: string) {
    const user = await this.getUser(studentId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new UnauthorizedException('기존 비밀번호가 일치하지 않습니다.');
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.db.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { studentId },
        UpdateExpression: 'SET password = :p',
        ExpressionAttributeValues: { ':p': hashed },
      }),
    );
    return { message: '비밀번호 변경 성공' };
  }

  /** 회원 탈퇴 */
  async deleteUser(studentId: string, password: string) {
    const user = await this.getUser(studentId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }
    await this.db.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { studentId },
      }),
    );
    return { message: '회원 탈퇴 성공' };
  }

  /** 내 정보 조회 (토큰 페이로드에서 studentId를 꺼낸 뒤 호출) */
  async getMyInfo(studentId: string) {
    const user = await this.getUser(studentId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    const { password, ...profile } = user;
    return { message: '내 정보 조회 성공', user: profile };
  }

  /** 공개 사용자 조회 */
  async findUser(studentId: string) {
    const user = await this.getUser(studentId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    const { password, ...profile } = user;
    return { message: '사용자 조회 성공', user: profile };
  }

  /** DynamoDB에서 사용자 조회 (private 헬퍼) */
  private async getUser(studentId: string): Promise<User | null> {
    const { Item } = await this.db.send(
      new GetCommand({ TableName: this.tableName, Key: { studentId } }),
    );
    return (Item as User) || null;
  }
}