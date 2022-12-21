import { InvalidFieldsError } from '@app/errors';
import { makeInMemoryCreateClient } from '@test/mocks/factories';

describe('Create client', () => {
  it('Should be able to create a client', async () => {
    const [mockedCreateClient, inMemoryRepository] = makeInMemoryCreateClient();
    const { client } = await mockedCreateClient.execute({
      username: 'test client',
      password: 'testePassword',
    });
    expect(inMemoryRepository.clients).toHaveLength(1);
    expect(inMemoryRepository.clients[0]).toEqual(client);
  });

  it('Should not be able to create a client when already exists', async () => {
    const [mockedCreateClient] = makeInMemoryCreateClient();
    const client = {
      username: 'test client',
      password: 'testePassword',
    };
    await mockedCreateClient.execute(client);
    expect(() => mockedCreateClient.execute(client)).rejects.toThrow(
      InvalidFieldsError,
    );
  });
});
