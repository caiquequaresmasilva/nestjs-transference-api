import { NotFoundError } from '@app/errors';
import { ClientRepository, TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';
import { Injectable } from '@nestjs/common';

interface CashOutRequest {
  fromClientUsername: string;
  toClientUsername: string;
  amount: number;
}

interface CashOutResponse {
  transaction: Transaction;
}
@Injectable()
export class CashOut {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute({
    fromClientUsername,
    toClientUsername,
    amount,
  }: CashOutRequest): Promise<CashOutResponse> {
    const [fromClient, toClient] = await Promise.all([
      this.clientRepository.findByUsername(fromClientUsername),
      this.clientRepository.findByUsername(toClientUsername),
    ]);

    if (!fromClient) {
      throw new NotFoundError('Client for cash-out not found');
    }
    if (!toClient) {
      throw new NotFoundError('Client for cash-in not found');
    }

    const transaction = new Transaction({
      amount,
      debitedAccount: fromClient.account,
      creditedAccount: toClient.account,
    });

    transaction.executeTransference();

    await this.transactionRepository.create(transaction);
    return { transaction };
  }
}
