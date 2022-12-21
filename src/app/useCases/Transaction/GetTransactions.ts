import { TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';
import { Injectable } from '@nestjs/common';

interface GetTransactionsRequest {
  accountId: string;
}

interface GetTransactionsResponse {
  transactions: Transaction[];
}
@Injectable()
export class GetTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute({
    accountId,
  }: GetTransactionsRequest): Promise<GetTransactionsResponse> {
    const transactions = await this.transactionRepository.findManyByAccountId(
      accountId,
    );
    return { transactions };
  }
}
