import { Repository } from 'typeorm';
import { Board } from '../entity/board.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRequestDto } from '../dto/board.requestDto';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>, // TypeORM 기본 Repository 주입
  ) {}

  async createBoard(dto: BoardRequestDto): Promise<Board> {
    const board = this.boardRepository.create(dto); // 엔티티 생성
    return this.boardRepository.save(board); // 엔티티 저장
  }
  // save 메서드 래핑 (Optional)
  async save(board: Board): Promise<Board> {
    return this.boardRepository.save(board); // save 메서드 호출
  }
}