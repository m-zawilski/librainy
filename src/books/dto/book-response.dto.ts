import { Exclude } from 'class-transformer';

export class BookResponseDto {
  @Exclude()
  id: number;

  title: string;
  author: string;

  pageCount: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  modifiedAt: Date;

  constructor(partial: Partial<BookResponseDto>) {
    Object.assign(this, partial);
  }
}
