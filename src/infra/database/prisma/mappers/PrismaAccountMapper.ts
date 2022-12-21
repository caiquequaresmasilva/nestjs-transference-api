import { Account } from '@domain/Account';
import { Prisma } from '@prisma/client';

type RawAccount = Prisma.AccountGetPayload<{
  select: { id: true; balance: true };
}>;

export class PrismaAccountMapper {
  static toDomain(raw: RawAccount) {
    return new Account(
      {
        balance: raw.balance,
      },
      raw.id,
    );
  }
}
