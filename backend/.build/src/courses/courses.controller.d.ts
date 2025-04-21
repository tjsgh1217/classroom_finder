import { CoursesService, CourseWithTime } from './courses.service';
export declare class CoursesController {
    private readonly svc;
    constructor(svc: CoursesService);
    getByRoom(room: string): Promise<CourseWithTime[]>;
}
