import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User.entity';
import { Repository } from 'typeorm';
import { UserRequestDto } from '../dto/user-request.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: UserRequestDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({email});
  }

  async updateUser(email: string,dto: Partial<UserRequestDto>): Promise<User> {
    await this.userRepository.update({email}, dto);
    return this.userRepository.findOneBy({email});
  }

  async deleteUser(email: string): Promise<void>{
    await this.userRepository.update(email,{isActive: false});
  }

}