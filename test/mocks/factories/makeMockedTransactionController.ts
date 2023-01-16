import {
  GetTransactions,
  FilterTransactions,
  CashOut,
} from '@app/useCases/Transaction';
import {
  InMemoryClientRepository,
  InMemoryTransactionRepository,
} from '../repositories';
import { TransactionController } from '@infra/http/controllers';

export function makeMockedTransactionController(): TransactionController {
  const clientRepo = new InMemoryClientRepository();
  const transactionRepo = new InMemoryTransactionRepository();
  const getTransactions = new GetTransactions(transactionRepo);
  const filterTransactions = new FilterTransactions(transactionRepo);
  const cashOut = new CashOut(clientRepo, transactionRepo);
  const transactionController = new TransactionController(
    getTransactions,
    filterTransactions,
    cashOut,
  );
  return transactionController;
}
