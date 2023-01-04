import { CreateClient } from '@app/useCases/Client/CreateClient';
import { InMemoryHashService } from '../adapters';
import { InMemoryClientRepository } from '../repositories';

export function makeInMemoryCreateClient(): CreateClient {
  const inMemoryClientRepository = new InMemoryClientRepository();
  return new CreateClient(inMemoryClientRepository, new InMemoryHashService());
}
