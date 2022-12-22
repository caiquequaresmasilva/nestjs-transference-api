import { AuthService } from '@infra/auth/auth.service';
import { JwtAuthGuard } from '@infra/auth/JwtAuthGuard';
import { LocalAuthGuard } from '@infra/auth/LocalAuthGuard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
