import { TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';

interface GetTransactionsRequest {
  accountId: string;
}

interface GetTransactionsResponse {
  transactions: Transaction[];
}

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
