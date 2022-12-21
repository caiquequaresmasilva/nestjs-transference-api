import { TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';

export class InMemoryTransactionRepository implements TransactionRepository {
  public transactions: Transaction[] = [];
  async create(data: Transaction): Promise<void> {
    this.transactions.push(data);
  }

  async findManyByAccountId(accountId: string): Promise<Transaction[]> {
    return this.transactions.filter(({ creditedAccount, debitedAccount }) =>
      [creditedAccount.id, debitedAccount.id].includes(accountId),
    );
  }
  async filterTransactions(
    accountId: string,
    date?: string,
    operation?: string | undefined,
  ): Promise<Transaction[]> {
    let transactions = await this.findManyByAccountId(accountId);
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setUTCDate(end.getUTCDate() + 1);
      transactions = transactions.filter(
        ({ createdAt }) => start <= createdAt && end >= createdAt,
      );
    }

    if (operation) {
      const account =
        operation === 'cash-out' ? 'debitedAccount' : 'creditedAccount';
      return transactions.filter((item) => item[account].id === accountId);
    }
    return transactions;
  }
}
