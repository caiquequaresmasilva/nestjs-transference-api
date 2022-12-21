import { InMemoryTransactionRepository } from '../repositories';
import { GetTransactions } from '@app/useCases/Transaction';

export function makeMockedGetTrasactions() {
  const transactionsRepo = new InMemoryTransactionRepository();
  return [new GetTransactions(transactionsRepo), transactionsRepo];
}
