import { CashOut } from '@app/useCases/Account';
import {
  InMemoryClientRepository,
  InMemoryTransactionRepository,
} from '../repositories';

export function makeMockedCashOut() {
  const inMemoryClientRepository = new InMemoryClientRepository();
  const inMemoryTransactionRepository = new InMemoryTransactionRepository();
  return [
    new CashOut(inMemoryClientRepository, inMemoryTransactionRepository),
    inMemoryClientRepository,
    inMemoryTransactionRepository,
  ];
}
