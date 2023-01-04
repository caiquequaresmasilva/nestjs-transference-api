import { NotFoundError } from '@app/errors';
import { makeClient, makeMockedCashOut } from '@test/mocks/factories';
import { InMemoryData } from '@test/mocks/repositories/inMemoryData';

describe('Cash-out', () => {
  const mockedCashOut = makeMockedCashOut();
  const fromClient = makeClient({ username: 'From Client' });
  const toClient = makeClient({ username: 'To Client' });
  const amount = 30;
  beforeEach(() => {
    InMemoryData.clear();
  });
  it('Should be able to do a cash-out transaction', async () => {
    InMemoryData.clients = [fromClient, toClient];
    const { transaction } = await mockedCashOut.execute({
      amount,
      fromClientUsername: fromClient.username,
      toClientUsername: toClient.username,
    });
    expect(transaction.amount).toEqual(amount);
    expect(transaction.creditedAccount.id).toEqual(toClient.account.id);
    expect(transaction.debitedAccount.id).toEqual(fromClient.account.id);
    expect(transaction.createdAt).toEqual(expect.any(Date));

    expect(InMemoryData.transactions.length).toEqual(1);
    expect(InMemoryData.transactions[0]).toEqual(transaction);
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
    InMemoryData.clients = [fromClient];
    expect(() =>
      mockedCashOut.execute({
        amount,
        fromClientUsername: fromClient.username,
        toClientUsername: toClient.username,
      }),
    ).rejects.toThrow(NotFoundError);
  });
});
