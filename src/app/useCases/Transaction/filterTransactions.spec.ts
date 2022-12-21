import {
  makeClient,
  makeMockedFilterTransactions,
  makeTransaction,
} from '@test/mocks/factories';

describe('Filter transactions', () => {
  const [mockedFilterTransactions, transactionRepo] =
    makeMockedFilterTransactions();
  const client = makeClient();
  const date = '2022-12-10';

  beforeEach(() => {
    transactionRepo.transactions = [
      makeTransaction({
        creditedAccount: client.account,
        createdAt: new Date(date),
      }),
      makeTransaction({
        debitedAccount: client.account,
        createdAt: new Date(date),
      }),
      makeTransaction({ creditedAccount: client.account }),
    ];
  });
  it('Should be able to filter transactions by date', async () => {
    const { transactions } = await mockedFilterTransactions.execute({
      accountId: client.account.id,
      date,
    });
    expect(transactions.length).toEqual(2);
  });

  it('Should be able to filter transactions by operation', async () => {
    let res = await mockedFilterTransactions.execute({
      accountId: client.account.id,
      operation: 'cash-out',
    });
    expect(res.transactions).toHaveLength(1);

    res = await mockedFilterTransactions.execute({
      accountId: client.account.id,
      operation: 'cash-in',
    });
    expect(res.transactions).toHaveLength(2);
  });

  it('Should be able to filter transactions by date and operation=cash-out', async () => {
    const { transactions } = await mockedFilterTransactions.execute({
      accountId: client.account.id,
      date,
      operation: 'cash-out',
    });
    expect(transactions.length).toEqual(1);
    expect(transactions[0].debitedAccount.id).toEqual(client.account.id);
  });

  it('Should be able to filter transactions by date and operation=cash-in', async () => {
    const { transactions } = await mockedFilterTransactions.execute({
      accountId: client.account.id,
      date,
      operation: 'cash-in',
    });
    expect(transactions.length).toEqual(1);
    expect(transactions[0].creditedAccount.id).toEqual(client.account.id);
  });
});
