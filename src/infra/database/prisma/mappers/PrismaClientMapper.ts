import { Account } from '@domain/Account';
import { Client } from '@domain/Client';
import { Prisma } from '@prisma/client';

type RawClient = Prisma.ClientGetPayload<{ include: { account: true } }>;

export class PrismaClientMapper {
  static toDomain(raw: RawClient) {
    return new Client(
      {
        username: raw.username,
        password: raw.password,
      },
      raw.id,
      new Account({ balance: raw.account.balance }, raw.accountId),
    );
  }

  static toPrisma(client: Client) {
    return {
      id: client.id,
      username: client.username,
      password: client.password,
      account: {
        create: {
          id: client.account.id,
          balance: client.account.balance,
        },
      },
    };
  }
}
