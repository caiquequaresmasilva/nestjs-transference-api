import { InMemoryTransactionRepository } from '../repositories';
import { GetTransactions } from '@app/useCases/Transaction';

export function makeMockedGetTrasactions(): GetTransactions {
  const transactionsRepo = new InMemoryTransactionRepository();
  return new GetTransactions(transactionsRepo);
}
