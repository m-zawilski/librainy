import { UserType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: number;

  name: string;
  email: string;

  @Expose({ name: 'userType' })
  userType() {
    return this.user_type;
  }

  @Expose({ name: 'createdAt' })
  createdAt() {
    return this.created_at;
  }

  @Expose({ name: 'updatedAt' })
  updatedAt() {
    return this.updated_at;
  }

  @Exclude()
  user_type: UserType;

  @Exclude()
  password: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
