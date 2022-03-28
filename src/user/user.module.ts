import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class UserModule {}
