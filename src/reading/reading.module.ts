import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BookService } from 'src/book/book.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReadingController],
  providers: [
    ReadingService,
    BookService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class ReadingModule {}
