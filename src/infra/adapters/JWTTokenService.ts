import { PayloadProps, TokenService } from '@app/adapters';
import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JWTTokenService implements TokenService {
  generate(payload: PayloadProps): string {
    return sign(payload, <string>process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    });
  }
  verify(token: string): PayloadProps {
    return verify(token, <string>process.env.TOKEN_SECRET) as PayloadProps;
  }
}
