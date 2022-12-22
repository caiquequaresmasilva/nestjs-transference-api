import { GetBalance } from '@app/useCases/Account';
import { JwtAuthGuard } from '@infra/auth/JwtAuthGuard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly getBalance: GetBalance) {}

  @Get()
  async balance(@Req() req: any) {
    const {
      user: { accountId },
    } = req;
    const { balance } = await this.getBalance.execute({ accountId });
    return { balance };
  }
}
