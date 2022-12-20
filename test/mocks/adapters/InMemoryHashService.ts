import { HashService } from '@app/adapters';

export class InMemoryHashService implements HashService {
  genHash(password: string): string {
    return password.toUpperCase();
  }

  compareHash(password: string, hash: string): boolean {
    return password.toUpperCase() == hash;
  }
}
