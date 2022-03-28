import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { ReadingModule } from './reading/reading.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptors/user.interceptor';

@Module({
  imports: [BooksModule, UserModule, AuthorModule, ReadingModule, PrismaModule],
  controllers: [AppController, BooksController],
  providers: [
    AppService,
    BooksService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AppModule {}
