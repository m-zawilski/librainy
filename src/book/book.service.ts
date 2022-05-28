import { Injectable, NotFoundException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedUser } from 'src/user/decorators/user.decorator';
import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    { title, author, pageCount, category, language }: CreateBookDto,
    user: AuthenticatedUser,
  ) {
    return this.prismaService.book.create({
      data: {
        title,
        author,
        page_count: pageCount,
        category,
        language,
        user_id: user.id,
      },
    });
  }

  async findAllOfAdmin(): Promise<BookResponseDto[]> {
    const books = await this.prismaService.book.findMany({
      where: {
        user: {
          user_type: UserType.ADMIN,
        },
      },
      include: {
        readings: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });
    return books.map((book) => {
      return new BookResponseDto(book);
    });
  }

  async findAllByUser(user: AuthenticatedUser): Promise<BookResponseDto[]> {
    const books = await this.prismaService.book.findMany({
      where: { user_id: user.id },
      include: {
        readings: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });
    return books.map((book) => {
      return new BookResponseDto(book);
    });
  }

  async findOne(id: number) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
      include: {
        readings: true,
      },
    });
    return new BookResponseDto(book);
  }

  async update(
    id: number,
    { title, author, pageCount, category, language }: UpdateBookDto,
  ) {
    return await this.prismaService.book.update({
      where: { id },
      data: {
        title,
        author,
        page_count: pageCount,
        category,
        language,
      },
    });
  }

  remove(id: number) {
    this.prismaService.book.delete({
      where: { id },
    });
  }

  async getUserByBookId(id: number) {
    const book = await this.prismaService.book.findUnique({
      where: {
        id,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            user_type: true,
          },
        },
      },
    });
    if (!book) {
      throw new NotFoundException();
    }
    return book.user;
  }
}
