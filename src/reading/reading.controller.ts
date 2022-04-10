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
import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { BookService } from 'src/book/book.service';

@Controller('reading')
export class ReadingController {
  constructor(
    private readonly readingService: ReadingService,
    private readonly bookService: BookService,
  ) {}

  @Post()
  async create(
    @Body() data: CreateReadingDto,
    @User() user: AuthenticatedUser,
  ) {
    const book = await this.bookService.findOne(data.bookId);
    const bookUser = await this.bookService.getUserByBookId(book.id);
    if (bookUser.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.readingService.create(data);
  }

  @Get()
  findAll(@User() user: AuthenticatedUser) {
    return this.readingService.findAllByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.readingService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateReadingDto,
    @User() user: AuthenticatedUser,
  ) {
    const book = await this.readingService.getBookByReadingId(id);
    const bookUser = await this.bookService.getUserByBookId(book.id);
    if (bookUser.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.readingService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @User() user: AuthenticatedUser) {
    const book = await this.readingService.getBookByReadingId(id);
    const bookUser = await this.bookService.getUserByBookId(book.id);
    if (bookUser.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.readingService.remove(+id);
  }
}
