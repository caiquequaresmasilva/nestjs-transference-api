import { TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';

type Operation = 'cash-in' | 'cash-out';

interface FilterTransactionsRequest {
  accountId: string;
  date: string;
  operation?: Operation;
}

interface FilterTransactionsResponse {
  transactions: Transaction[];
}

export class FilterTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute({
    accountId,
    date,
    operation,
  }: FilterTransactionsRequest): Promise<FilterTransactionsResponse> {
    const transactions = await this.transactionRepository.filterTransactions(
      accountId,
      date,
      operation,
    );
    return { transactions };
  }
}
