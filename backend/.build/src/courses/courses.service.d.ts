export interface CourseWithTime {
    courseId: string;
    department: string;
    courseName: string;
    time: string;
    room: string;
}
export declare class CoursesService {
    private readonly db;
    private readonly TABLE;
    constructor();
    private parseSchedule;
    findBlockByRoom(room: string): Promise<CourseWithTime[]>;
}
