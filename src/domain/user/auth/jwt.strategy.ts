import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 JWT 추출
      ignoreExpiration: false, // 만료된 토큰 거부
      secretOrKey: 'JWT_SECRET', // 토큰 검증 키
    });
  }

  // 토큰이 유효한 경우 호출
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role }; // 인증된 사용자 정보 반환
  }
}
