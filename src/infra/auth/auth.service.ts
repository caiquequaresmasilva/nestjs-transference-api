import { HashService } from '@app/adapters';
import { ClientRepository } from '@app/repositories';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.clientRepository.findByUsername(username);
    if (user && this.hashService.compareHash(pass, user.password)) {
      return {
        id: user.id,
        username: user.username,
        accountId: user.account.id,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      id: user.id,
      accountId: user.accountId,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
