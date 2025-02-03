import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserResponseDto } from '../dto/user-respones.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../entity/User.entity';


@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    return this.userService.createUser(dto);
  }

  // 로그인 (JWT 발급)
  @Post('login')
  async login(
    @Body() dto: UserRequestDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.loginUser(dto.email,dto.password);
  }

  // 프로필 조회 (JWT 검증 필요)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req): Promise<any> {
    return this.userService.getProfile(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Put("update")
  async updateUser(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    return this.userService.updateUser(dto);
  }

}