import { PayloadProps, TokenService } from '@app/adapters';

export class MockedTokenService implements TokenService {
  private tokens: string[] = [];
  generate({ id, username, accountId }: PayloadProps): string {
    const token = `${id}-${username}-${accountId}`;
    this.tokens.push(token);
    return token;
  }
  verify(token: string): PayloadProps {
    const fields = token.split('-');
    return {
      id: fields[0],
      username: fields[1],
      accountId: fields[2],
    };
  }
}
