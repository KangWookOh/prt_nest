import { Column } from 'typeorm';
import { Board } from '../entity/board.entity';

export class BoardResponseDto {
  title: string;

  contents: string;

  writer: string;

  createAt: Date;

  updateAt: Date;


  constructor(title: string, contents: string, writer: string, createAt: Date, updateAt: Date) {
    this.title = title;
    this.contents = contents;
    this.writer = writer;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }

  static from(entity:Board): BoardResponseDto {
    return new BoardResponseDto(entity.title, entity.contents,entity.writer,entity.createAt,entity.updateAt);
  }

}