import { FilterTransactions } from '@app/useCases/Transaction';
import { InMemoryTransactionRepository } from '../repositories';

export function makeMockedFilterTransactions(): [
  FilterTransactions,
  InMemoryTransactionRepository,
] {
  const transactionsRepo = new InMemoryTransactionRepository();
  return [new FilterTransactions(transactionsRepo), transactionsRepo];
}
