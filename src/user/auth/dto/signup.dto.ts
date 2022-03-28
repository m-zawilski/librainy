import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SinginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
