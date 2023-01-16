import { NotFoundError } from '@app/errors';
import { InvalidTransactionError } from '@domain/errors';
import {
  CashOut,
  FilterTransactions,
  GetTransactions,
  Operation,
} from '@app/useCases/Transaction';
import { JwtAuthGuard } from '@infra/auth/JwtAuthGuard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CashOutDTO, QueryDTO } from '../dto';
import { TransactionView } from '../view-models';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionController {
  constructor(
    private readonly getTransactions: GetTransactions,
    private readonly filterTransactions: FilterTransactions,
    private readonly cashOut: CashOut,
  ) {}
  private statusCode = 500;
  private readonly logger = new Logger(TransactionController.name);

  @Get()
  async handleGetTransactions(@Req() req: any) {
    const {
      user: { accountId },
    } = req;
    const { transactions } = await this.getTransactions.execute({ accountId });
    this.logger.log(`Client ${req.user.username} checked his transactions`);
    return { transactions: transactions.map(TransactionView.toHTTP) };
  }

  @Get('filter')
  async handleFilterTransactions(@Req() req, @Query() query: QueryDTO) {
    const {
      user: { accountId },
    } = req;
    const { date } = query;
    const operation = <Operation>query.operation;
    const { transactions } = await this.filterTransactions.execute({
      accountId,
      date,
      operation,
    });
    this.logger.log(`Client ${req.user.username} checked his transactions`);
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
      this.logger.log(
        `Client ${req.user.username} made a cash-out of ${amount} to ${toClientUsername}`,
      );
      return { transaction: TransactionView.toHTTP(transaction) };
    } catch (e) {
      if (e instanceof NotFoundError) {
        this.statusCode = 404;
      }
      if (e instanceof InvalidTransactionError) {
        this.statusCode = 400;
      }
      this.logger.error((<Error>e).stack);
      throw new HttpException(
        (<Error>e).message || 'Internal server error',
        this.statusCode,
      );
    }
  }
}
