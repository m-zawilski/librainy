import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateReadingDto } from './create-reading.dto';

export class UpdateReadingDto extends PartialType(CreateReadingDto) {
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
