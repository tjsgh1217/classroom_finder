import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body()
    body: {
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

  @Post('login')
  async login(@Body() body: { studentId: string; password: string }) {
    return this.authService.login(body.studentId, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async changePassword(
    @Req() request: Request,
    @Body() body: { oldpassword: string; newpassword: string },
  ) {
    const studentId = (request as any).user.studentId;
    return this.authService.changePassword(
      studentId,
      body.oldpassword,
      body.newpassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteUser(
    @Req() request: Request,
    @Body() body: { password: string },
  ) {
    const studentId = (request as any).user.studentId;
    return this.authService.deleteUser(studentId, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyInfo(@Req() request: Request) {
    const studentId = (request as any).user.studentId;
    return this.authService.getMyInfo(studentId);
  }

  // @Get('user/:studentId')
  // async findUser(@Param('studentId') studentId: string) {
  //   return this.authService.findUser(studentId);
  // }
}
