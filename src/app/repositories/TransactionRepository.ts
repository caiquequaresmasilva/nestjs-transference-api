import { Transaction } from '@domain/Transaction';

export abstract class TransactionRepository {
  abstract create(data: Transaction): Promise<void>;
  abstract findManyByAccountId(accountId: string): Promise<Transaction[]>;
}
