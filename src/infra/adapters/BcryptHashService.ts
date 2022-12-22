import { HashService } from '@app/adapters';
import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';

@Injectable()
export class BcryptHashService implements HashService {
  genHash(password: string): string {
    return hashSync(password, 10);
  }
  compareHash(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
