import { NotFoundError } from '@app/errors';
import { GetBalance } from '@app/useCases/Account';
import { JwtAuthGuard } from '@infra/auth/JwtAuthGuard';
import {
  Controller,
  Get,
  HttpException,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('accounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly getBalance: GetBalance) {}
  private readonly logger = new Logger(AccountController.name);
  private statusCode = 500;

  @Get()
  async balance(@Req() req: any) {
    const {
      user: { accountId },
    } = req;

    try {
      const { balance } = await this.getBalance.execute({ accountId });
      this.logger.log(`Client ${req.user.username} checked his balance`);
      return { balance };
    } catch (e) {
      if (e instanceof NotFoundError) {
        this.statusCode = 404;
      }
      this.logger.error((<Error>e).stack);
      throw new HttpException(
        (<Error>e).message || 'Internal server error',
        this.statusCode,
      );
    }
  }
}
