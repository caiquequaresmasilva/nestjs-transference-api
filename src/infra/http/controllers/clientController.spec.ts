import { makeMockedClientController } from '@test/mocks/factories';
import { InMemoryData } from '@test/mocks/repositories/inMemoryData';

describe('ClientController', () => {
  const clientController = makeMockedClientController();
  beforeEach(() => {
    InMemoryData.clear();
  });
  it('Should create a new client when the method "create" is called', async () => {
    const { client } = await clientController.create({
      username: 'test client',
      password: 'testePassword12!',
    });
    expect(client).toHaveProperty('username', 'test client');
    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('accountId');

    expect(InMemoryData.clients).toHaveLength(1);
  });
});
