import { makeMockedClientController } from '@test/mocks/factories';

describe('ClientController', () => {
  const [clientController, clientRepo] = makeMockedClientController();
  beforeEach(() => {
    clientRepo.clients = [];
  });
  it('Should create a new client when the method "create" is called', async () => {
    const { client } = await clientController.create({
      username: 'test client',
      password: 'testePassword12!',
    });
    expect(client).toHaveProperty('username', 'test client');
    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('accountId');

    expect(clientRepo.clients).toHaveLength(1);
  });

  it('Should return an authentication token when the method "login" is called', async () => {
    await clientController.create({
      username: 'test client',
      password: 'testePassword12!',
    });
    const response = await clientController.login({
      username: 'test client',
      password: 'testePassword12!',
    });

    expect(response).toHaveProperty('token');
    expect(response.token).toEqual(expect.any(String));
  });
});
