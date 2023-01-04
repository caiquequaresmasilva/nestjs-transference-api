import { AccountRepository } from '@app/repositories';
import { Account } from '@domain/Account';
import { InMemoryData } from './inMemoryData';

export class InMemoryAccountRepository implements AccountRepository {
  async findById(accountId: string): Promise<Account | null> {
    const account = InMemoryData.accounts.find((item) => item.id === accountId);
    if (!account) {
      return null;
    }
    return account;
  }
}
