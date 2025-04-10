import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module'; // 예시

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // .env를 전역으로 사용
    }),
    AuthModule,
  ],
})
export class AppModule {}