import { CashOut } from '@app/useCases/Transaction';
import {
  InMemoryClientRepository,
  InMemoryTransactionRepository,
} from '../repositories';

export function makeMockedCashOut(): CashOut {
  const inMemoryClientRepository = new InMemoryClientRepository();
  const inMemoryTransactionRepository = new InMemoryTransactionRepository();
  return new CashOut(inMemoryClientRepository, inMemoryTransactionRepository);
}
