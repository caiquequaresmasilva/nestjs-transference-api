import { NotFoundError } from '@app/errors';
import { makeClient, makeMockedGetBalance } from '@test/mocks/factories';
import { InMemoryData } from '@test/mocks/repositories/inMemoryData';

describe('Get balance', () => {
  const mockedGetBalance = makeMockedGetBalance();
  const client = makeClient();
  beforeEach(() => {
    InMemoryData.clear();
  });
  it('Should be able to return the balance of the client', async () => {
    InMemoryData.accounts.push(client.account);
    const { balance } = await mockedGetBalance.execute({
      accountId: client.account.id,
    });
    expect(balance).toEqual(100);
  });

  it('Should not be able to return the balance when the account does not exists', async () => {
    expect(() =>
      mockedGetBalance.execute({
        accountId: client.account.id,
      }),
    ).rejects.toThrow(NotFoundError);
  });
});
