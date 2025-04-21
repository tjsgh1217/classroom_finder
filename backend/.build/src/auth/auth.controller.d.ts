import { Request } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: {
        studentId: string;
        password: string;
        name: string;
        department: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        studentId: string;
        password: string;
    }): Promise<{
        message: string;
        accessToken: string;
        user: {
            studentId: string;
            name: string;
            department: string;
        };
    }>;
    changePassword(request: Request, body: {
        oldpassword: string;
        newpassword: string;
    }): Promise<{
        message: string;
    }>;
    deleteUser(request: Request, body: {
        password: string;
    }): Promise<{
        message: string;
    }>;
    getMyInfo(request: Request): Promise<{
        message: string;
        user: {
            studentId: string;
            name: string;
            department: string;
        };
    }>;
}
