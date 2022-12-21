import { Transaction, TransactionProps } from '@domain/Transaction';
import { makeClient } from './makeClient';

export function makeTransaction(override: Partial<TransactionProps>) {
  const debitedClient = makeClient({ username: 'Debited Client' });
  const creditedClient = makeClient({ username: 'Credited Client' });

  return new Transaction({
    amount: 30,
    creditedAccount: debitedClient.account,
    debitedAccount: creditedClient.account,
    ...override,
  });
}
