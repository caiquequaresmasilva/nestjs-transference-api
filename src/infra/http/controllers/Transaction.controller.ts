import {
  CashOut,
  FilterTransactions,
  GetTransactions,
} from '@app/useCases/Transaction';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CashOutDTO } from '../dto';
import { TransactionView } from '../view-models';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly getTransactions: GetTransactions,
    private readonly filterTransactions: FilterTransactions,
    private readonly cashOut: CashOut,
  ) {}

  @Get()
  async handleGetTransactions(@Req() req: any) {
    const {
      user: { accountId },
    } = req;
    const { transactions } = await this.getTransactions.execute({ accountId });
    return { transactions: transactions.map(TransactionView.toHTTP) };
  }

  @Get()
  async handleFilterTransactions(@Req() req) {
    const {
      user: { accountId },
      query: { date, operation },
    } = req;
    const { transactions } = await this.filterTransactions.execute({
      accountId,
      date,
      operation,
    });
    return { transactions: transactions.map(TransactionView.toHTTP) };
  }

  @Post('cash-out')
  async handleCashOut(@Req() req, @Body() body: CashOutDTO) {
    const {
      user: { username },
    } = req;
    const { amount, toClientUsername } = body;
    const { transaction } = await this.cashOut.execute({
      fromClientUsername: username,
      toClientUsername,
      amount,
    });
    return { transaction: TransactionView.toHTTP(transaction) };
  }
}
