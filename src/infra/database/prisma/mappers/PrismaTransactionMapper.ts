import { Transaction } from '@domain/Transaction';
import { Prisma } from '@prisma/client';
import { PrismaAccountMapper } from './PrismaAccountMapper';

type RawTransaction = Prisma.TransactionGetPayload<{
  include: { creditedAccount: true; debitedAccount: true };
}>;

export class PrismaTransactionMapper {
  static toDomain(raw: RawTransaction) {
    return new Transaction(
      {
        amount: raw.amount,
        createdAt: raw.createdAt,
        creditedAccount: PrismaAccountMapper.toDomain({
          id: raw.creditedAccountId,
          balance: raw.creditedAccount.balance,
        }),
        debitedAccount: PrismaAccountMapper.toDomain({
          id: raw.debitedAccountId,
          balance: raw.debitedAccount.balance,
        }),
      },
      raw.id,
    );
  }

  static toPrisma(transaction: Transaction) {
    return {
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        createdAt: transaction.createdAt,
      },
      debitedAccount: {
        id: transaction.debitedAccount.id,
        balance: transaction.debitedAccount.balance,
      },
      creditedAccount: {
        id: transaction.creditedAccount.id,
        balance: transaction.creditedAccount.balance,
      },
    };
  }
}
