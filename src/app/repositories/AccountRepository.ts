import { Account } from '@domain/Account';

export abstract class AccountRepository {
  abstract findById(id: string): Promise<Account | null>;
}
