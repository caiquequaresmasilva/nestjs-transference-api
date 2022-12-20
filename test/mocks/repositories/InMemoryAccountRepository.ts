import { AccountRepository } from '@app/repositories';
import { Account } from '@domain/Account';

export class InMemoryAccountRepository implements AccountRepository {
  public accounts: Account[] = [];
  async findById(accountId: string): Promise<Account | null> {
    const account = this.accounts.find((item) => item.id === accountId);
    if (!account) {
      return null;
    }
    return account;
  }
}
