import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly svc: UsersService) {}

  // 공개 조회: GET /users/:studentId
  @Get(':studentId')
  async findOne(@Param('studentId') studentId: string) {
    return this.svc.findByStudentId(studentId);
  }

  // 보호된 내 계정: GET /users/me
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req) {
    const studentId = (req as any).user.studentId;
    return this.svc.findByStudentId(studentId);
  }
}