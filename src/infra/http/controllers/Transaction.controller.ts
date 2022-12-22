import { NotFoundError } from '@app/errors';
import { InvalidTransactionError } from '@domain/errors';
import {
  CashOut,
  FilterTransactions,
  GetTransactions,
} from '@app/useCases/Transaction';
import { JwtAuthGuard } from '@infra/auth/JwtAuthGuard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CashOutDTO } from '../dto';
import { TransactionView } from '../view-models';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(
    private readonly getTransactions: GetTransactions,
    private readonly filterTransactions: FilterTransactions,
    private readonly cashOut: CashOut,
  ) {}
  private statusCode = 500;

  @Get()
  async handleGetTransactions(@Req() req: any) {
    const {
      user: { accountId },
    } = req;
    const { transactions } = await this.getTransactions.execute({ accountId });
    return { transactions: transactions.map(TransactionView.toHTTP) };
  }

  @Get('filter')
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
    try {
      const { transaction } = await this.cashOut.execute({
        fromClientUsername: username,
        toClientUsername,
        amount,
      });
      return { transaction: TransactionView.toHTTP(transaction) };
    } catch (e) {
      if (e instanceof NotFoundError) {
        this.statusCode = 404;
      }
      if (e instanceof InvalidTransactionError) {
        this.statusCode = 400;
      }
      throw new HttpException(
        (<Error>e).message || 'Internal server error',
        this.statusCode,
      );
    }
  }
}
