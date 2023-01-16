import { InvalidFieldsError } from '@app/errors';
import { makeInMemoryCreateClient } from '@test/mocks/factories';
import { InMemoryData } from '@test/mocks/repositories/inMemoryData';

describe('Create client', () => {
  it('Should be able to create a client', async () => {
    InMemoryData.clear();
    const mockedCreateClient = makeInMemoryCreateClient();
    const { client } = await mockedCreateClient.execute({
      username: 'test client',
      password: 'testePassword',
    });
    expect(InMemoryData.clients).toHaveLength(1);
    expect(InMemoryData.clients[0]).toEqual(client);
  });

  it('Should not be able to create a client when already exists', async () => {
    const mockedCreateClient = makeInMemoryCreateClient();
    const client = {
      username: 'test client',
      password: 'testePassword',
    };
    expect(() => mockedCreateClient.execute(client)).rejects.toThrow(
      InvalidFieldsError,
    );
  });
});
