import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { Board } from '../entity/board.entity';
import { BoardRequestDto } from '../dto/board.requestDto';
import { BoardResponseDto } from '../dto/board.responseDto';
import { BoardRepository } from '../repository/board.repository';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository,
              private readonly userRepository: UserRepository,) {}

  async createBoard(dto: BoardRequestDto,email:string): Promise<Board> {
    const user = await this.userRepository.getUserByEmail(email);
    if(!user)
      throw new NotFoundException("User Not Found");

    const board = this.boardRepository.createBoard({
      ...dto,
      writer: user.nickname,
    });
    return this.boardRepository.save(await board);
  }

  async getBoard(dto: BoardRequestDto): Promise<Board> {
    
  }




}