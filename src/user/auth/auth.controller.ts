import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticatedUser, User } from '../decorators/user.decorator';
import { AuthService } from './auth.service';
import { SignupDto, SinginDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  signin(@Body() body: SinginDto) {
    return this.authService.signin(body);
  }

  @Get('/me')
  me(@User() user: AuthenticatedUser) {
    return user;
  }
}
