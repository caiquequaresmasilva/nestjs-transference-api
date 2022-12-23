import { NotFoundError } from '@app/errors';
import { GetBalance } from '@app/useCases/Account';
import { JwtAuthGuard } from '@infra/auth/JwtAuthGuard';
import { Controller, Get, HttpException, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('accounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly getBalance: GetBalance) {}
  private statusCode = 500;

  @Get()
  async balance(@Req() req: any) {
    const {
      user: { accountId },
    } = req;

    try {
      const { balance } = await this.getBalance.execute({ accountId });
      return { balance };
    } catch (e) {
      if (e instanceof NotFoundError) {
        this.statusCode = 404;
      }
      throw new HttpException(
        (<Error>e).message || 'Internal server error',
        this.statusCode,
      );
    }
  }
}
