import { makeClient, makeMockedAccountController } from '@test/mocks/factories';

describe('AccountController', () => {
  const [accountController, accountRepo] = makeMockedAccountController();
  it('Should return the balance of the client when the method "balance" is called', async () => {
    const client = makeClient();
    accountRepo.accounts.push(client.account);
    const response = await accountController.balance({
      user: { accountId: client.account.id },
    });

    expect(response).toHaveProperty('balance', client.account.balance);
  });
});
