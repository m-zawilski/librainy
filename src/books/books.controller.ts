import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedUser, User } from 'src/user/decorators/user.decorator';
import { BooksService } from './books.service';
import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(
    @Body() createBookDto: CreateBookDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.booksService.create(createBookDto, user);
  }

  @Get()
  findAll(): Promise<BookResponseDto[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
    @User() user: AuthenticatedUser,
  ) {
    const bookUser = await this.booksService.getUserByBookId(id);
    if (bookUser.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @User() user: AuthenticatedUser) {
    const bookUser = await this.booksService.getUserByBookId(id);
    if (bookUser.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.booksService.remove(+id);
  }
}
