import { CategoryType, LanguageType, Reading } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { ReadingResponseDto } from 'src/reading/dto/reading-response.dto';

export class BookResponseDto {
  id: number;
  title: string;
  author: string;
  category: CategoryType;
  language: LanguageType;

  @Expose({ name: 'readings' })
  readingsList() {
    return this.readings.map((reading) => new ReadingResponseDto(reading));
  }

  @Expose({ name: 'pageCount' })
  pageCount() {
    return this.page_count;
  }

  @Expose({ name: 'createdAt' })
  createdAt() {
    return this.created_at;
  }

  @Expose({ name: 'updatedAt' })
  updatedAt() {
    return this.updated_at;
  }

  @Exclude()
  page_count: number;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  user_id: number;

  @Exclude()
  readings: Reading[];

  constructor(partial: Partial<BookResponseDto>) {
    Object.assign(this, partial);
  }
}
