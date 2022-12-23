import { AuthService } from '@infra/auth/auth.service';
import { LocalAuthGuard } from '@infra/auth/LocalAuthGuard';
import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ClientDTO } from '../dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: ClientDTO })
  async login(@Request() req) {
    this.logger.log(`Client ${req.user.username} logged successfully`);
    return this.authService.login(req.user);
  }
}
