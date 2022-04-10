import { Exclude, Expose } from 'class-transformer';

export class ReadingResponseDto {
  id: number;
  date: Date;

  @Expose({ name: 'pageReadCount' })
  pageReadCount() {
    return this.page_read_count;
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
  page_read_count: number;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  book_id: number;

  constructor(partial: Partial<ReadingResponseDto>) {
    Object.assign(this, partial);
  }
}
