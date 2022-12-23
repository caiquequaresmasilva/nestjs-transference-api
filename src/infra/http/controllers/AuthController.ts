import { AuthService } from '@infra/auth/auth.service';
import { LocalAuthGuard } from '@infra/auth/LocalAuthGuard';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ClientDTO } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: ClientDTO })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
