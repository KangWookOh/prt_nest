import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entity/User.entity'; // User 엔티티
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // User 엔티티 등록
    JwtModule.register({
      secret: 'JWT_SECRET', // 반드시 환경 변수로 설정할 것을 권장
      signOptions: { expiresIn: '1h' }, // 토큰 만료 시간
    }),
  ],
  controllers: [UserController], // 컨트롤러 등록
  providers: [UserService, UserRepository, JwtStrategy], // 서비스, 리포지토리, JWT 전략 등록
  exports: [UserService,UserRepository], // 다른 모듈에서 UserService 사용 가능
})
export class UserModule {}
