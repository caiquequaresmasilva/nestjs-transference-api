import { TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';

export class InMemoryTransactionRepository implements TransactionRepository {
  public transactions: Transaction[] = [];
  async create(data: Transaction): Promise<void> {
    this.transactions.push(data);
  }
}
