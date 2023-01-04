import {
  makeClient,
  makeMockedGetTrasactions,
  makeTransaction,
} from '@test/mocks/factories';
import { InMemoryData } from '@test/mocks/repositories/inMemoryData';

describe('Get transactions', () => {
  const mockedGetTransactions = makeMockedGetTrasactions();
  const client = makeClient();

  beforeEach(() => {
    InMemoryData.clear();
  });
  it('Should be able get all the transactions of an account', async () => {
    const debit = makeTransaction({ debitedAccount: client.account });
    const credit = makeTransaction({ creditedAccount: client.account });
    InMemoryData.transactions = [debit, makeTransaction(), credit];

    const { transactions } = await mockedGetTransactions.execute({
      accountId: client.account.id,
    });

    expect(transactions.length).toEqual(2);
    expect(transactions[0]).toEqual(debit);
    expect(transactions[1]).toEqual(credit);
  });
});
