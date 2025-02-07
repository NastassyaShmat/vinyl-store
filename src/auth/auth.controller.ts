import { Controller, Post, Body, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { AuthService } from './auth.service';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(TokenInterceptor)
  @Post('login')
  login(@Req() req, @Body() signInDto: SignInDto) {
    return req['user'];
  }

  @Post('register')
  async register(@Body() signUpDto: SignUpDto): Promise<{ status: string }> {
    await this.authService.register(signUpDto);
    return { status: 'Success' };
  }
}
