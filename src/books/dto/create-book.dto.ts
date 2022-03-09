import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

export class CreateBookDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsPositive()
  pageCount: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  modifiedAt: Date;
}

export class BookResponseDto {
  @Exclude()
  id: string;

  title: string;
  author: string;
  pageCount: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  modifiedAt: Date;
}
