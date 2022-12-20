import { HashService } from '@app/adapters';

export class InMemoryHashService implements HashService {
  private hashSet = new Set();
  genHash(password: string): string {
    const hashedPassword = password.toUpperCase();
    this.hashSet.add(hashedPassword);
    return hashedPassword;
  }
}
