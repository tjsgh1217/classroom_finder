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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
let CoursesService = class CoursesService {
    db;
    TABLE = 'Courses';
    constructor() {
        const client = new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION });
        this.db = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
    }
    parseSchedule(row) {
        const rawStr = row.time.replace(/\s+/g, '');
        const tokens = rawStr.match(/[월화수목금]\w+|\d+/g) ?? [];
        const rooms = row.room.replace(/\s+/g, '').split('/');
        const sched = [];
        let prevDay = null;
        let roomIndex = 0;
        for (const token of tokens) {
            let dayKr = null;
            let period;
            const m = token.match(/^([월화수목금])(.+)$/);
            if (m) {
                dayKr = m[1];
                period = m[2];
                if (prevDay !== null) {
                    roomIndex = Math.min(roomIndex + 1, rooms.length - 1);
                }
                prevDay = dayKr;
            }
            else if (prevDay) {
                dayKr = prevDay;
                period = token;
            }
            else {
                continue;
            }
            const room = rooms[roomIndex] ?? rooms.at(-1);
            sched.push({ dayKr, period, room });
        }
        return sched;
    }
    async findBlockByRoom(room) {
        const { Items } = await this.db.send(new lib_dynamodb_1.ScanCommand({ TableName: this.TABLE }));
        const raw = Items;
        const out = [];
        for (const r of raw) {
            if (!r.room.replace(/\s+/g, '').split('/').includes(room))
                continue;
            const sched = this.parseSchedule(r).filter(s => s.room === room);
            const groups = {};
            sched.forEach(s => {
                const key = `${s.dayKr}_${s.room}`;
                (groups[key] ||= []).push(s.period);
            });
            for (const key in groups) {
                const [dayKr, roomKey] = key.split('_');
                out.push({
                    courseId: r.courseId,
                    department: r.department,
                    courseName: r.courseName,
                    time: `${dayKr}${groups[key].join('/')}`,
                    room: roomKey,
                });
            }
        }
        const order = { 월: 0, 화: 1, 수: 2, 목: 3, 금: 4 };
        out.sort((a, b) => {
            const dA = a.time.charAt(0);
            const dB = b.time.charAt(0);
            return (order[dA] ?? 5) - (order[dB] ?? 5);
        });
        return out;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CoursesService);
//# sourceMappingURL=courses.service.js.map