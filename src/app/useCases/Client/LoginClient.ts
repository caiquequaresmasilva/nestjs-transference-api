import { HashService, TokenService } from '@app/adapters';
import { InvalidFieldsError } from '@app/errors';
import { ClientRepository } from '@app/repositories';
import { Injectable } from '@nestjs/common';

interface LoginClientRequest {
  username: string;
  password: string;
}

interface LoginClientResponse {
  token: string;
}
@Injectable()
export class LoginClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService,
  ) {}

  async execute(request: LoginClientRequest): Promise<LoginClientResponse> {
    const { username, password } = request;
    const client = await this.clientRepository.findByUsername(username);
    if (!client || !this.hashService.compareHash(password, client.password)) {
      throw new InvalidFieldsError('Username or password incorrect');
    }
    const token = this.tokenService.generate({
      id: client.id,
      username,
      accountId: client.account.id,
    });
    return { token };
  }
}
