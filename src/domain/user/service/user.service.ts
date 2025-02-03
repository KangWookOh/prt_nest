import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserResponseDto } from '../dto/user-respones.dto';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/User.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
              private readonly jwtService: JwtService,) {}

  async createUser(dto: UserRequestDto): Promise<UserResponseDto>{
    const salt  = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.password,salt);

    const user = await this.userRepository.createUser({
      ...dto,
      password: hashPassword,
    });

    return UserResponseDto.from(user);
  }

  // JWT 로그인
  async loginUser(email: string, password: string): Promise<{ accessToken: string }> {
    // 1. 이메일로 사용자 찾기
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    // 2. 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    // 3. JWT 토큰 생성
    const payload = { sub: user.id, email: user.email, role: user.role }; // JWT Payload
    const accessToken = this.jwtService.sign(payload); // 토큰 생성

    return { accessToken }; // 액세스 토큰 반환
  }

  async getProfile(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserByEmail(email);
    if(!user) throw new UnauthorizedException("User not found");
    return UserResponseDto.from(user);
  }

  async updateUser(dto: UserRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserByEmail(dto.email);
    if(!user) throw new UnauthorizedException("User not found");

    if(dto.password){
      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password,salt);
    }

    const updateUser = await this.userRepository.updateUser(user.email,dto);

    return UserResponseDto.from(updateUser);
  }

  async deleteUser(email: string): Promise<void> {
    const user = await this.userRepository.getUserByEmail(email);
    if(!user) throw new UnauthorizedException("User not found");

    await this.userRepository.deleteUser(email)
  }
}