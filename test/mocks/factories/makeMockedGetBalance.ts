import { GetBalance } from '@app/useCases/Account';
import { InMemoryAccountRepository } from '../repositories';

export function makeMockedGetBalance(): [
  GetBalance,
  InMemoryAccountRepository,
] {
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  return [new GetBalance(inMemoryAccountRepository), inMemoryAccountRepository];
}
