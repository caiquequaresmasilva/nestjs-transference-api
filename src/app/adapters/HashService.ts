export abstract class HashService {
  abstract genHash(password: string): string;
  abstract compareHash(password: string, hash: string): boolean;
}
