import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReadingDto {
  @IsNumber()
  @IsNotEmpty()
  pageReadCount: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  bookId: number;
}
