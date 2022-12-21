import { CreateClient, LoginClient } from '@app/useCases/Client';
import { ClientController } from '@infra/http/controllers/ClientController.controller';
import { InMemoryHashService, MockedTokenService } from '../adapters';
import { InMemoryClientRepository } from '../repositories';

export function makeMockedClientController(): [
  ClientController,
  InMemoryClientRepository,
] {
  const tokenService = new MockedTokenService();
  const hashService = new InMemoryHashService();
  const memoryRepo = new InMemoryClientRepository();
  const loginClient = new LoginClient(memoryRepo, tokenService, hashService);
  const createCliente = new CreateClient(memoryRepo, hashService);
  const clientController = new ClientController(createCliente, loginClient);
  return [clientController, memoryRepo];
}
