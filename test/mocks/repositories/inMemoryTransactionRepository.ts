import { TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';
import { InMemoryData } from './inMemoryData';

export class InMemoryTransactionRepository implements TransactionRepository {
  async create(data: Transaction): Promise<void> {
    InMemoryData.transactions.push(data);
    const { debitedAccount, creditedAccount } = data;
    const debitedInd = InMemoryData.accounts.findIndex(
      (item) => item.id === debitedAccount.id,
    );
    const creditedInd = InMemoryData.accounts.findIndex(
      (item) => item.id === creditedAccount.id,
    );
    InMemoryData.accounts[debitedInd] = debitedAccount;
    InMemoryData.accounts[creditedInd] = creditedAccount;
  }

  async findManyByAccountId(accountId: string): Promise<Transaction[]> {
    return InMemoryData.transactions.filter(
      ({ creditedAccount, debitedAccount }) =>
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
