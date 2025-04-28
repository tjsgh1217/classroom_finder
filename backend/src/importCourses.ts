import 'dotenv/config';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';

const tableName = 'Courses';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-northeast-2',
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  // },
});

const db = DynamoDBDocumentClient.from(client);

const itemsMap = new Map<string, any>();

fs.createReadStream(__dirname + '/courses.csv')
  .pipe(
    csv({
      headers: ['courseId', 'department', 'courseName', 'time', 'room'],
      strict: true,
    }),
  )
  .on('data', (row) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!row.courseId) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    itemsMap.set(row.courseId, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      courseId: row.courseId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      department: row.department,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      courseName: row.courseName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      time: row.time,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      room: row.room,
    });
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .on('end', async () => {
    console.log('CSV 읽기 완료. 최종 항목 수 (중복 제거 후):', itemsMap.size);

    // PutRequest 배열 생성
    const items = Array.from(itemsMap.values()).map((item) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      PutRequest: { Item: item },
    }));

    // 25개씩 배치 업로드
    for (let i = 0; i < items.length; i += 25) {
      const batch = items.slice(i, i + 25);
      try {
        await db.send(
          new BatchWriteCommand({
            RequestItems: {
              [tableName]: batch,
            },
          }),
        );
        console.log(`Batch Write 성공 (항목 ${i + 1}~${i + batch.length})`);
      } catch (err) {
        console.error('Batch Write 오류:', err);
      }
    }

    console.log('모든 데이터 업로드 완료');
  })
  .on('error', (err) => {
    console.error('CSV 읽기 중 오류:', err);
  });

// npx ts-node src/importCourses.ts
