import { User } from '../entity/User.entity';

export class UserResponseDto{
    email: string;
    password: string;
    nickname: string;
    role: string;


    constructor(email: string, password: string, nickname: string, role: string) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
    }

    static from(entity:User): UserResponseDto{
        return new UserResponseDto(entity.email, entity.password, entity.nickname, entity.role);
    }
}