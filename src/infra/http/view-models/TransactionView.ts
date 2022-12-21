import { Transaction } from '@domain/Transaction';

export class TransactionView {
  static toHTTP(transaction: Transaction) {
    return {
      id: transaction.id,
      amount: transaction.amount,
      creditedAccountId: transaction.creditedAccount.id,
      debitedAccountId: transaction.debitedAccount.id,
      createdAt: transaction.createdAt,
    };
  }
}
