import { makeClient, makeMockedAccountController } from '@test/mocks/factories';
import { InMemoryData } from '@test/mocks/repositories/inMemoryData';

beforeAll(() => {
  InMemoryData.clear();
});
describe('AccountController', () => {
  const accountController = makeMockedAccountController();
  it('Should return the balance of the client when the method "balance" is called', async () => {
    const client = makeClient();
    InMemoryData.accounts.push(client.account);
    const response = await accountController.balance({
      user: { accountId: client.account.id },
    });

    expect(response).toHaveProperty('balance', client.account.balance);
  });
});
