import { GetBalance } from '@app/useCases/Account';
import { Controller, Get, Req } from '@nestjs/common';
@Controller('accounts')
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
