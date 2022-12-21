import { NotFoundError } from '@app/errors';
import { makeClient, makeMockedCashOut } from '@test/mocks/factories';

describe('Cash-out', () => {
  const [mockedCashOut, clientRepo, transactionRepo] = makeMockedCashOut();
  const fromClient = makeClient({ username: 'From Client' });
  const toClient = makeClient({ username: 'To Client' });
  const amount = 30;
  beforeEach(() => {
    clientRepo.clients = [];
    transactionRepo.transactions = [];
  });
  it('Should be able to do a cash-out transaction', async () => {
    clientRepo.clients = [fromClient, toClient];
    const { transaction } = await mockedCashOut.execute({
      amount,
      fromClientUsername: fromClient.username,
      toClientUsername: toClient.username,
    });
    expect(transaction.amount).toEqual(amount);
    expect(transaction.creditedAccount.id).toEqual(toClient.account.id);
    expect(transaction.debitedAccount.id).toEqual(fromClient.account.id);
    expect(transaction.createdAt).toEqual(expect.any(Date));

    expect(transactionRepo.transactions.length).toEqual(1);
    expect(transactionRepo.transactions[0]).toEqual(transaction);
  });

  it('Should not be able to cash-out when debited client does not exist', async () => {
    expect(() =>
      mockedCashOut.execute({
        amount,
        fromClientUsername: fromClient.username,
        toClientUsername: toClient.username,
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('Should not be able to cash-out when credited client does not exist', async () => {
    clientRepo.clients = [fromClient];
    expect(() =>
      mockedCashOut.execute({
        amount,
        fromClientUsername: fromClient.username,
        toClientUsername: toClient.username,
      }),
    ).rejects.toThrow(NotFoundError);
  });
});
