import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from 'aws-sdk';
import * as bcrypt from 'bcrypt'; 
import * as jwt from 'jsonwebtoken';

interface User {
  studentId: string;
  password: string;
  name: string;
  department: string;
}

@Injectable()
export class AuthService {
  private dynamoDb: DynamoDB.DocumentClient;
  private tableName: string;
  private jwtSecret: string = 'MY_SECRET';

  constructor(private configService: ConfigService) {
    // 환경변수에서 값 불러오기
    const region = this.configService.get<string>('AWS_REGION') || 'ap-northeast-2';
    this.tableName = this.configService.get<string>('USERS_TABLE') || 'Users';
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') || this.jwtSecret;
    
    // 환경변수를 통해 AWS 자격 증명을 읽어옴
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    // 디버그용 로그 (개발 중에만 사용, 배포 전 제거)
    console.log('AWS_ACCESS_KEY_ID:', accessKeyId);
    console.log('AWS_SECRET_ACCESS_KEY:', secretAccessKey);
    console.log('AWS_REGION:', region);

    // DynamoDB DocumentClient 초기화 (환경변수에서 받은 자격 증명 사용)
    this.dynamoDb = new DynamoDB.DocumentClient({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }

  // 회원가입: 학번, 비밀번호, 이름, 학과를 받아서 저장
  async signUp(studentId: string, password: string, name: string, department: string) {
    const existingUser = await this.getUserByStudentId(studentId);
    if (existingUser) {
      throw new ConflictException('이미 등록된 학번입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { studentId, password: hashedPassword, name, department };

    await this.dynamoDb
      .put({
        TableName: this.tableName,
        Item: newUser,
      })
      .promise();

    return { message: '회원가입 성공' };
  }

  // 로그인: 학번과 비밀번호를 비교하여 JWT 토큰 발급
  async login(studentId: string, password: string) {
    const user = await this.getUserByStudentId(studentId);
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }
    const token = jwt.sign(
      { studentId: user.studentId, name: user.name },
      this.jwtSecret,
      { expiresIn: '1h' },
    );
    return {
      message: '로그인 성공',
      accessToken: token,
      user: { studentId: user.studentId, name: user.name, department: user.department },
    };
  }

  // 비밀번호 변경: 기존 비밀번호와 비교 후 새로운 비밀번호로 업데이트
  async changePassword(studentId: string, oldPassword: string, newPassword: string) {
    const user = await this.getUserByStudentId(studentId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      throw new UnauthorizedException('기존 비밀번호가 일치하지 않습니다.');
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await this.dynamoDb.update({
      TableName: this.tableName,
      Key: { studentId },
      UpdateExpression: 'set password = :p',
      ExpressionAttributeValues: {
        ':p': newHashedPassword,
      },
    }).promise();

    return { message: '비밀번호 변경 성공' };
  }

  // 회원 탈퇴: 학번과 비밀번호를 확인 후 해당 사용자 삭제
  async deleteUser(studentId: string, password: string) {
    const user = await this.getUserByStudentId(studentId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }
    await this.dynamoDb.delete({
      TableName: this.tableName,
      Key: { studentId },
    }).promise();

    return { message: '회원 탈퇴 성공' };
  }

  // 내 정보 조회: JWT를 통해 학번을 얻었다고 가정 (비밀번호 제외)
  async getMyInfo(studentId: string) {
    const user = await this.getUserByStudentId(studentId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const { password, ...userInfo } = user;
    return userInfo;
  }

  // 학번으로 사용자 조회 (DynamoDB 'get' 사용)
  async getUserByStudentId(studentId: string): Promise<User | null> {
    const result = await this.dynamoDb.get({
      TableName: this.tableName,
      Key: { studentId },
    }).promise();
    return (result.Item as User) || null;
  }
}