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
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() data: CreateBookDto, @User() user: AuthenticatedUser) {
    return this.bookService.create(data, user);
  }

  @Get()
  findAll(@User() user: AuthenticatedUser) {
    return this.bookService.findAllByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateBookDto,
    @User() user: AuthenticatedUser,
  ) {
    const bookUser = await this.bookService.getUserByBookId(id);
    if (bookUser.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.bookService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @User() user: AuthenticatedUser) {
    const bookUser = await this.bookService.getUserByBookId(id);
    if (bookUser.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.bookService.remove(+id);
  }
}
