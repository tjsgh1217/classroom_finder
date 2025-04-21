"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs = require("fs");
const csv = require("csv-parser");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const tableName = 'Courses';
const client = new client_dynamodb_1.DynamoDBClient({
    region: process.env.AWS_REGION || 'ap-northeast-2',
});
const db = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const itemsMap = new Map();
fs.createReadStream(__dirname + '/courses.csv')
    .pipe(csv({
    headers: ['courseId', 'department', 'courseName', 'time', 'room'],
    strict: true,
}))
    .on('data', (row) => {
    if (!row.courseId)
        return;
    itemsMap.set(row.courseId, {
        courseId: row.courseId,
        department: row.department,
        courseName: row.courseName,
        time: row.time,
        room: row.room,
    });
})
    .on('end', async () => {
    console.log('CSV 읽기 완료. 최종 항목 수 (중복 제거 후):', itemsMap.size);
    const items = Array.from(itemsMap.values()).map((item) => ({
        PutRequest: { Item: item },
    }));
    for (let i = 0; i < items.length; i += 25) {
        const batch = items.slice(i, i + 25);
        try {
            await db.send(new lib_dynamodb_1.BatchWriteCommand({
                RequestItems: {
                    [tableName]: batch,
                },
            }));
            console.log(`Batch Write 성공 (항목 ${i + 1}~${i + batch.length})`);
        }
        catch (err) {
            console.error('Batch Write 오류:', err);
        }
    }
    console.log('모든 데이터 업로드 완료');
})
    .on('error', (err) => {
    console.error('CSV 읽기 중 오류:', err);
});
//# sourceMappingURL=importCourses.js.map