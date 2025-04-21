"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
let AuthService = class AuthService {
    configService;
    db;
    tableName;
    jwtSecret;
    constructor(configService) {
        this.configService = configService;
        const region = this.configService.get('AWS_REGION') || 'ap-northeast-2';
        this.tableName = this.configService.get('USERS_TABLE') || 'Users';
        this.jwtSecret =
            this.configService.get('JWT_SECRET') || 'MY_SECRET';
        const client = new client_dynamodb_1.DynamoDBClient({
            region,
        });
        this.db = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
    }
    validateStudentId(studentId) {
        const regex = /^\d{8}$/;
        return regex.test(studentId);
    }
    validatePassword(password) {
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const validCharsOnly = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/.test(password);
        return hasSpecialChar && validCharsOnly;
    }
    async signUp(studentId, password, name, department) {
        if (!this.validateStudentId(studentId)) {
            throw new common_1.BadRequestException('학번은 8자리 숫자여야 합니다.');
        }
        if (!this.validatePassword(password)) {
            throw new common_1.BadRequestException('비밀번호는 영어, 숫자, 특수문자만 사용 가능하며, 특수문자를 반드시 포함해야 합니다.');
        }
        if (await this.getUser(studentId)) {
            throw new common_1.ConflictException('이미 등록된 학번입니다.');
        }
        const hashed = await bcrypt.hash(password, 10);
        const newUser = {
            studentId,
            password: hashed,
            name,
            department,
        };
        await this.db.send(new lib_dynamodb_1.PutCommand({
            TableName: this.tableName,
            Item: newUser,
        }));
        return { message: '회원가입 성공' };
    }
    async login(studentId, password) {
        const user = await this.getUser(studentId);
        if (!user) {
            throw new common_1.UnauthorizedException('학번 또는 비밀번호가 올바르지 않습니다.');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException('학번 또는 비밀번호가 올바르지 않습니다.');
        }
        const token = jwt.sign({ studentId, name: user.name }, this.jwtSecret, {
            expiresIn: '3h',
        });
        return {
            message: '로그인 성공',
            accessToken: token,
            user: {
                studentId: user.studentId,
                name: user.name,
                department: user.department,
            },
        };
    }
    async changePassword(studentId, oldPassword, newPassword) {
        const user = await this.getUser(studentId);
        if (!user)
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        if (!(await bcrypt.compare(oldPassword, user.password))) {
            throw new common_1.UnauthorizedException('기존 비밀번호가 일치하지 않습니다.');
        }
        if (!this.validatePassword(newPassword)) {
            throw new common_1.BadRequestException('비밀번호는 영어, 숫자, 특수문자만 사용 가능하며, 특수문자를 반드시 포함해야 합니다.');
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.db.send(new lib_dynamodb_1.UpdateCommand({
            TableName: this.tableName,
            Key: { studentId },
            UpdateExpression: 'SET password = :p',
            ExpressionAttributeValues: { ':p': hashed },
        }));
        return { message: '비밀번호 변경 성공' };
    }
    async deleteUser(studentId, password) {
        const user = await this.getUser(studentId);
        if (!user)
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('비밀번호가 올바르지 않습니다.');
        }
        await this.db.send(new lib_dynamodb_1.DeleteCommand({
            TableName: this.tableName,
            Key: { studentId },
        }));
        return { message: '회원 탈퇴 성공' };
    }
    async getMyInfo(studentId) {
        const user = await this.getUser(studentId);
        if (!user)
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        const { password, ...profile } = user;
        return { message: '내 정보 조회 성공', user: profile };
    }
    async getUser(studentId) {
        const { Item } = await this.db.send(new lib_dynamodb_1.GetCommand({ TableName: this.tableName, Key: { studentId } }));
        return Item || null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map