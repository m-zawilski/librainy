import { CategoryType, LanguageType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsPositive()
  pageCount: number;

  @IsString()
  category: CategoryType;

  @IsString()
  language: LanguageType;
}
