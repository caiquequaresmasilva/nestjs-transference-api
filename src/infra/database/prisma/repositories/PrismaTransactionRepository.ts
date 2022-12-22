import { TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';
import { Injectable } from '@nestjs/common';
import { PrismaTransactionMapper } from '../mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findManyByAccountId(accountId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [{ creditedAccountId: accountId }, { debitedAccountId: accountId }],
      },
      include: {
        creditedAccount: true,
        debitedAccount: true,
      },
    });
    return transactions.map(PrismaTransactionMapper.toDomain);
  }
  async filterTransactions(
    accountId: string,
    date?: string | undefined,
    operation?: string | undefined,
  ): Promise<Transaction[]> {
    let transactions = await this.findManyByAccountId(accountId);
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setUTCDate(end.getUTCDate() + 1);
      transactions = transactions.filter(
        ({ createdAt }) => start <= createdAt && end >= createdAt,
      );
    }

    if (operation) {
      const account =
        operation === 'cash-out' ? 'debitedAccount' : 'creditedAccount';
      return transactions.filter((item) => item[account].id === accountId);
    }
    return transactions;
  }

  async create(data: Transaction): Promise<void> {
    const { transaction, creditedAccount, debitedAccount } =
      PrismaTransactionMapper.toPrisma(data);
    await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: debitedAccount.id },
        data: { balance: debitedAccount.balance },
      }),
      this.prisma.account.update({
        where: { id: creditedAccount.id },
        data: { balance: creditedAccount.balance },
      }),
      this.prisma.transaction.create({
        data: {
          id: transaction.id,
          amount: transaction.amount,
          createdAt: transaction.createdAt,
          creditedAccount: {
            connect: { id: creditedAccount.id },
          },
          debitedAccount: {
            connect: { id: debitedAccount.id },
          },
        },
      }),
    ]);
  }
}
