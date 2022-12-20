import { CashOut } from '@app/useCases/Account';
import {
  InMemoryClientRepository,
  InMemoryTransactionRepository,
} from '../repositories';

export function makeMockedCashOut(): [
  CashOut,
  InMemoryClientRepository,
  InMemoryTransactionRepository,
] {
  const inMemoryClientRepository = new InMemoryClientRepository();
  const inMemoryTransactionRepository = new InMemoryTransactionRepository();
  return [
    new CashOut(inMemoryClientRepository, inMemoryTransactionRepository),
    inMemoryClientRepository,
    inMemoryTransactionRepository,
  ];
}
