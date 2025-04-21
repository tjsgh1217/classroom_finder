import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private configService;
    private readonly db;
    private readonly tableName;
    private readonly jwtSecret;
    constructor(configService: ConfigService);
    private validateStudentId;
    private validatePassword;
    signUp(studentId: string, password: string, name: string, department: string): Promise<{
        message: string;
    }>;
    login(studentId: string, password: string): Promise<{
        message: string;
        accessToken: string;
        user: {
            studentId: string;
            name: string;
            department: string;
        };
    }>;
    changePassword(studentId: string, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    deleteUser(studentId: string, password: string): Promise<{
        message: string;
    }>;
    getMyInfo(studentId: string): Promise<{
        message: string;
        user: {
            studentId: string;
            name: string;
            department: string;
        };
    }>;
    private getUser;
}
