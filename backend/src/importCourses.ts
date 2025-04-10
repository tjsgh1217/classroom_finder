import 'dotenv/config';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { DynamoDB } from 'aws-sdk';

console.log('ENV AWS_ACCESS_KEY_ID =', process.env.AWS_ACCESS_KEY_ID);
console.log('ENV AWS_SECRET_ACCESS_KEY =', process.env.AWS_SECRET_ACCESS_KEY);
console.log('ENV AWS_REGION =', process.env.AWS_REGION);

const dynamoDb = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION || 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const tableName = 'Courses'; // DynamoDB 테이블 이름

// Map을 사용하여 courseId 기준으로 중복 제거 (마지막 데이터가 덮어씀)
const itemsMap = new Map<string, any>();

// CSV 파일이 src 폴더 안에 있다고 가정
const csvFilePath = __dirname + '/courses.csv';
console.log('CSV 파일 경로:', csvFilePath);

fs.createReadStream(csvFilePath)
  .pipe(
    csv({
      // CSV에 헤더가 없다고 가정하고,
      // 순서대로 ['courseId','department','courseName','time','room'] 매핑
      headers: ['courseId', 'department', 'courseName', 'time', 'room'],
      strict: true,
    })
  )
  .on('data', (row) => {
    console.log('파싱된 row:', row);
    
    if (!row.courseId) {
      console.warn('courseId 누락된 행:', row);
      return;
    }
    
    // 같은 courseId가 나오면 마지막 행으로 덮어씀
    itemsMap.set(row.courseId, {
      PutRequest: {
        Item: {
          courseId: row.courseId,
          department: row.department,
          courseName: row.courseName,
          time: row.time,
          room: row.room,
        },
      },
    });
  })
  .on('end', async () => {
    const items = Array.from(itemsMap.values());
    console.log('CSV 읽기 완료. 최종 항목 수 (중복 제거 후):', items.length);
    
    const batchSize = 25;
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const params = {
        RequestItems: {
          [tableName]: batch,
        },
      };

      try {
        const result = await dynamoDb.batchWrite(params).promise();
        console.log(`Batch Write 성공 (항목 ${i + 1} ~ ${i + batch.length}):`, result);
      } catch (error) {
        console.error('Batch Write 오류:', error);
      }
    }

    console.log('모든 데이터 업로드 완료');
  })
  .on('error', (err) => {
    console.error('CSV 파일 읽기 중 오류 발생:', err);
  });