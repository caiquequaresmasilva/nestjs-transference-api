export interface PayloadProps {
  id: string;
  username: string;
  accountId: string;
}
export abstract class TokenService {
  abstract generate(payload: PayloadProps): string;
  abstract verify(token: string): PayloadProps;
}
