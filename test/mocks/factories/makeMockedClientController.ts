import { CreateClient } from '@app/useCases/Client';
import { ClientController } from '@infra/http/controllers/Client.controller';
import { InMemoryHashService } from '../adapters';
import { InMemoryClientRepository } from '../repositories';

export function makeMockedClientController(): ClientController {
  const hashService = new InMemoryHashService();
  const memoryRepo = new InMemoryClientRepository();
  const createCliente = new CreateClient(memoryRepo, hashService);
  const clientController = new ClientController(createCliente);
  return clientController;
}
