import { Injectable, NotFoundException } from '@nestjs/common';
import { BookStatusType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedUser } from 'src/user/decorators/user.decorator';
import { CreateReadingDto } from './dto/create-reading.dto';
import { ReadingResponseDto } from './dto/reading-response.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';

@Injectable()
export class ReadingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ pageReadCount, date, bookId }: CreateReadingDto) {
    const book = await this.prismaService.book.findUnique({
      where: { id: bookId },
    });
    if (pageReadCount === book.page_count) {
      this.prismaService.book.update({
        where: { id: bookId },
        data: { status: BookStatusType.FINISHED },
      });
    }
    return await this.prismaService.reading.create({
      data: {
        page_read_count: pageReadCount,
        date,
        book_id: bookId,
      },
    });
  }

  async findAllByUser(user: AuthenticatedUser) {
    const books = await this.prismaService.book.findMany({
      where: { user_id: user.id },
    });
    const bookIds = books.map((book) => book.id);
    const readings = await this.findAllByBookIds(...bookIds);
    return readings.map((reading) => {
      return new ReadingResponseDto(reading);
    });
  }

  async findAllByBookIds(...bookIds: number[]) {
    return await this.prismaService.reading.findMany({
      where: { book_id: { in: bookIds } },
    });
  }

  async findLatestByBookId(bookId: number) {
    return await this.prismaService.reading.findFirst({
      where: { book_id: bookId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.reading.findUnique({
      where: { id },
    });
  }

  async update(id: number, { pageReadCount, date, bookId }: UpdateReadingDto) {
    const book = await this.prismaService.book.findUnique({
      where: { id: bookId },
    });
    if (pageReadCount === book.page_count) {
      this.prismaService.book.update({
        where: { id: bookId },
        data: { status: BookStatusType.FINISHED },
      });
    }
    return await this.prismaService.reading.update({
      where: { id },
      data: {
        page_read_count: pageReadCount,
        date,
        book_id: bookId,
      },
    });
  }

  async remove(id: number) {
    this.prismaService.reading.delete({
      where: { id },
    });
  }

  async getBookByReadingId(id: number) {
    const reading = await this.prismaService.reading.findUnique({
      where: {
        id,
      },
      select: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
          },
        },
      },
    });
    if (!reading) {
      throw new NotFoundException();
    }
    return reading.book;
  }
}
