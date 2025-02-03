import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 사용할 데이터베이스 타입
      host: 'localhost', // 데이터베이스 호스트
      port: 3306, // 데이터베이스 포트 (MySQL 기본값)
      username: 'root', // 사용자 이름
      password: 'root', // 비밀번호
      database: 'nest', // 데이터베이스 이름
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 파일 경로
      synchronize: true, // 개발 중에만 true로 설정 (데이터베이스 스키마를 자동으로 동기화)
    }),
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
