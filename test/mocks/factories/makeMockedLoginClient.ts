import { LoginClient } from '@app/useCases/Client';
import { MockedTokenService, InMemoryHashService } from '../adapters';
import { InMemoryClientRepository } from '../repositories';

export function makeMockedLoginClient(): [
  LoginClient,
  InMemoryClientRepository,
] {
  const inMemoryClientRepository = new InMemoryClientRepository();
  return [
    new LoginClient(
      inMemoryClientRepository,
      new MockedTokenService(),
      new InMemoryHashService(),
    ),
    inMemoryClientRepository,
  ];
}
