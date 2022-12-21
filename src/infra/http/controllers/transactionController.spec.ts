import {
  makeClient,
  makeMockedTransactionController,
  makeTransaction,
} from '@test/mocks/factories';

describe('TransactionController', () => {
  const [transactionController, transactionRepo, clientRepo] =
    makeMockedTransactionController();
  beforeEach(() => {
    transactionRepo.transactions = [];
    clientRepo.clients = [];
  });
  it('Should be able to return the transactions of a logged client', async () => {
    const client = makeClient();
    transactionRepo.transactions = [
      makeTransaction({ debitedAccount: client.account }),
      makeTransaction({ creditedAccount: client.account }),
      makeTransaction(),
    ];
    const { transactions } = await transactionController.handleGetTransactions({
      user: { accountId: client.account.id },
    });
    expect(transactions).toHaveLength(2);
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ debitedAccountId: client.account.id }),
        expect.objectContaining({ creditedAccountId: client.account.id }),
      ]),
    );
  });

  it('Should be able to filter transactions of a logged client', async () => {
    const client = makeClient();
    const date = '2022-12-10';

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
    let res = await transactionController.handleFilterTransactions({
      user: { accountId: client.account.id },
      query: { date },
    });
    expect(res.transactions).toHaveLength(2);

    res = await transactionController.handleFilterTransactions({
      user: { accountId: client.account.id },
      query: { operation: 'cash-out' },
    });

    expect(res.transactions).toHaveLength(1);

    res = await transactionController.handleFilterTransactions({
      user: { accountId: client.account.id },
      query: { operation: 'cash-in' },
    });
    expect(res.transactions).toHaveLength(2);

    res = await transactionController.handleFilterTransactions({
      user: { accountId: client.account.id },
      query: { operation: 'cash-out', date },
    });
    expect(res.transactions).toHaveLength(1);

    res = await transactionController.handleFilterTransactions({
      user: { accountId: client.account.id },
      query: { operation: 'cash-in', date },
    });
    expect(res.transactions).toHaveLength(1);
  });

  it('Should be able to cash-out and return the transaction created', async () => {
    const fromclient = makeClient({ username: 'from client' });
    const toClient = makeClient({ username: 'to client' });
    clientRepo.clients = [fromclient, toClient];

    expect(transactionRepo.transactions).toHaveLength(0);

    const { transaction } = await transactionController.handleCashOut(
      { user: { username: fromclient.username } },
      { amount: 30, toClientUsername: toClient.username },
    );

    expect(transactionRepo.transactions).toHaveLength(1);
    expect(transaction).toEqual(
      expect.objectContaining({
        debitedAccountId: fromclient.account.id,
        creditedAccountId: toClient.account.id,
        createdAt: expect.any(Date),
        amount: 30,
      }),
    );
  });
});
