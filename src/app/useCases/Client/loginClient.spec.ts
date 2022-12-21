import { InvalidFieldsError } from '@app/errors';
import { makeClient, makeMockedLoginClient } from '@test/mocks/factories';

describe('Login client', () => {
  const [mockedLoginClient, clientRepository] = makeMockedLoginClient();
  const client = makeClient();
  beforeEach(() => {
    clientRepository.clients = [];
  });
  it('Should be able to login a client and create the authentication token', async () => {
    clientRepository.clients.push(client);

    const { token } = await mockedLoginClient.execute({
      username: client.username,
      password: client.password.toLowerCase(),
    });
    expect(typeof token).toBe('string');
  });

  it('Should not be able to login a client when username not exists', async () => {
    expect(() =>
      mockedLoginClient.execute({
        username: 'Client not exists',
        password: 'passwordNotExists',
      }),
    ).rejects.toThrow(InvalidFieldsError);
  });

  it('Should not be able to login a client when password is incorrect', async () => {
    clientRepository.clients.push(client);

    expect(() =>
      mockedLoginClient.execute({
        username: client.username,
        password: 'incorrectPassword',
      }),
    ).rejects.toThrow(InvalidFieldsError);
  });
});
