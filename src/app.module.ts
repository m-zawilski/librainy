import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { ReadingModule } from './reading/reading.module';

@Module({
  imports: [BooksModule, UserModule, AuthorModule, ReadingModule],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {}
