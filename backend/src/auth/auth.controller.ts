import { Controller, Post, Get, Patch, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입: POST /auth/signup
  @Post('signup')
  async signUp(
    @Body() body: { studentId: string; password: string; name: string; department: string },
  ) {
    return this.authService.signUp(body.studentId, body.password, body.name, body.department);
  }

  // 로그인: POST /auth/login
  @Post('login')
  async login(@Body() body: { studentId: string; password: string }) {
    return this.authService.login(body.studentId, body.password);
  }

  // 비밀번호 변경: PATCH /auth/password
  @Patch('password')
  async changePassword(
    @Body() body: { studentId: string; oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(body.studentId, body.oldPassword, body.newPassword);
  }

  // 회원 탈퇴: DELETE /auth/delete
  @Delete('delete')
  async deleteUser(@Body() body: { studentId: string; password: string }) {
    return this.authService.deleteUser(body.studentId, body.password);
  }

  // 내 정보 조회: GET /auth/me
  // JWT 인증 가드로 보호되어, Authorization 헤더에 Bearer 토큰을 포함해야 합니다.
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyInfo(@Req() request: Request) {
    // JwtAuthGuard에서 request.user에 토큰 payload를 넣어두었음
    return { message: '내 정보 조회 성공', user: request['user'] };
  }
}