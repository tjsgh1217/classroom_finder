import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입: 누구나 접근 가능
  // POST /auth/signup
  @Post('signup')
  async signUp(
    @Body() body: {
      studentId: string;
      password: string;
      name: string;
      department: string;
    },
  ) {
    return this.authService.signUp(
      body.studentId,
      body.password,
      body.name,
      body.department,
    );
  }

  // 로그인: 누구나 접근 가능
  // POST /auth/login
  @Post('login')
  async login(@Body() body: { studentId: string; password: string }) {
    return this.authService.login(body.studentId, body.password);
  }

  // 비밀번호 변경: 로그인된 사용자만
  // PATCH /auth/password
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async changePassword(
    @Req() request: Request,
    @Body() body: { oldpassword: string; newpassword: string },
  ) {
    // 토큰에서 studentId 꺼내기
    const studentId = (request as any).user.studentId;
    return this.authService.changePassword(
      studentId,
      body.oldpassword,
      body.newpassword,
    );
  }

  // 회원 탈퇴: 로그인된 사용자만
  // DELETE /auth/delete
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteUser(
    @Req() request: Request,
    @Body() body: { password: string },
  ) {
    const studentId = (request as any).user.studentId;
    return this.authService.deleteUser(studentId, body.password);
  }

  // 내 정보 조회: 로그인된 사용자만
  // GET /auth/me
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyInfo(@Req() request: Request) {
    const user = (request as any).user;
    return {
      message: '내 정보 조회 성공',
      user,
    };
  }
}