import { Column } from 'typeorm';

export class BoardRequestDto {
  title: string;

  contents: string;



  writer: string;


  constructor(title: string, contents: string, writer: string) {
    this.title = title;
    this.contents = contents;
    this.writer = writer;
  }
}