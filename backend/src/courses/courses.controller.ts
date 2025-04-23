import { Controller, Get, Query } from '@nestjs/common';
import { CoursesService, CourseWithTime } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly svc: CoursesService) {}

  @Get()
  async getByRoom(@Query('room') room: string): Promise<CourseWithTime[]> {
    return this.svc.findBlockByRoom(room);
  }
  @Get('building')
  async getByBuilding(
    @Query('code') buildingCode: string,
  ): Promise<Record<string, CourseWithTime[]>> {
    return this.svc.findBlocksByBuilding(buildingCode);
  }
}
