import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    name,
    email,
    password,
    userType,
    readingGoal,
  }: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        user_type: userType,
        reading_goal: readingGoal,
      },
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => {
      return new UserResponseDto(user);
    });
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return new UserResponseDto(user);
  }

  async update(
    id: number,
    { name, email, password, userType, readingGoal }: UpdateUserDto,
  ) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        user_type: userType,
        reading_goal: readingGoal,
      },
    });
    return new UserResponseDto(user);
  }

  async remove(id: number) {
    await this.prismaService.user.delete({ where: { id } });
  }
}
