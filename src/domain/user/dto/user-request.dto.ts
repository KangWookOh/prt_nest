import { UserRole } from '../entity/user-role.enum';

export class UserRequestDto {
    email: string;
    password: string;
    role: UserRole; // UserRole Enum 타입으로 변경
    nickname?: string;

    constructor(email: string, password: string, role: UserRole,nickname?: string) {
        this.email = email;
        this.password = password;
        this.role = role || UserRole.USER;
        this.nickname = nickname;
    }
}
