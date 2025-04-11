import { Controller, Get, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly svc: CoursesService) {}

  // GET /courses?room=090425-0
  @Get()
  async findAll(
    @Query('room') room?: string,
    @Query('day') day?: string,
  ) {
    // 둘 중 하나만 쓰거나, 없으면 전체 리턴
    return this.svc.findCourses({ room, day });
  }
}