import {
  makeClient,
  makeMockedGetTrasactions,
  makeTransaction,
} from '@test/mocks/factories';

describe('Get transactions', () => {
  const [mockedGetTransactions, transactionRepo] = makeMockedGetTrasactions();
  const client = makeClient();

  beforeEach(() => {
    transactionRepo.transactions = [];
  });
  it('Should be able get all the transactions of an account', async () => {
    const debit = makeTransaction({ debitedAccount: client.account });
    const credit = makeTransaction({ creditedAccount: client.account });
    transactionRepo.transactions = [debit, makeTransaction(), credit];

    const { transactions } = await mockedGetTransactions.execute({
      accountId: client.account.id,
    });

    expect(transactions.length).toEqual(2);
    expect(transactions[0]).toEqual(debit);
    expect(transactions[1]).toEqual(credit);
  });
});
