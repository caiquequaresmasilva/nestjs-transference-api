import { HashService } from '@app/adapters';
import { ClientRepository } from '@app/repositories';
import { Test } from '@nestjs/testing';
import { makeClient } from '@test/mocks/factories';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let clientRepo: ClientRepository;
  let hashService: HashService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    clientRepo = moduleRef.get<ClientRepository>(ClientRepository);
    hashService = moduleRef.get<HashService>(HashService);
  });

  describe('validateUser', () => {
    it('should return the client if exists or null', async () => {
      const client = makeClient();
      jest
        .spyOn(clientRepo, 'findByUsername')
        .mockImplementation(() => Promise.resolve(client));
      jest.spyOn(hashService, 'compareHash').mockImplementation(() => true);

      expect(
        await authService.validateUser(client.username, client.password),
      ).toEqual(
        expect.objectContaining({
          id: client.id,
          username: client.username,
          accountId: client.account.id,
        }),
      );
    });
  });

  describe('login', () => {
    it('should return the authentication token', async () => {
      expect(
        await authService.login({
          username: 'teste username',
          accountId: 'testeAccountId',
          id: 'teste-id-42',
        }),
      ).toHaveProperty('token');
    });
  });
});
