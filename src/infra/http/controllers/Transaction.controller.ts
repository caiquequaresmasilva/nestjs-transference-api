import {
  CashOut,
  FilterTransactions,
  GetTransactions,
} from '@app/useCases/Transaction';
import { Controller, Get, Post, Req } from '@nestjs/common';
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
  async handleCashOut(@Req() req) {
    const {
      user: { username },
      body: { amount, toClientUsername },
    } = req;
    const { transaction } = await this.cashOut.execute({
      fromClientUsername: username,
      toClientUsername,
      amount,
    });
    return { transaction: TransactionView.toHTTP(transaction) };
  }
}
