import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedUser } from 'src/user/decorators/user.decorator';
import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBookDto: CreateBookDto, user: AuthenticatedUser) {
    console.log(user.id);
    return 'This action adds a new book';
  }

  async findAll(): Promise<BookResponseDto[]> {
    const books = await this.prismaService.book.findMany();
    return books.map((book) => {
      return new BookResponseDto(book);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
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
