import { Account } from './Account';
import { InvalidTransactionError } from './errors';
import { Transaction } from './Transaction';

describe('Transaction domain entity', () => {
  it('Should be able to create a transaction', () => {
    const transaction = new Transaction({
      amount: 50,
      creditedAccount: new Account({ balance: 50 }),
      debitedAccount: new Account({ balance: 150 }),
    });
    expect(transaction).toBeTruthy();
    expect(transaction.createdAt).toBeTruthy();
  });

  it('Should be able to execute the transference between accounts', () => {
    const transaction = new Transaction({
      amount: 50,
      creditedAccount: new Account({ balance: 50 }),
      debitedAccount: new Account({ balance: 150 }),
    });

    transaction.executeTransference();
    expect(transaction.creditedAccount.balance).toEqual(100);
    expect(transaction.debitedAccount.balance).toEqual(100);
  });

  it('Should not be able to execute the transference when there is not sufficient balance from debited account', () => {
    const transaction = new Transaction({
      amount: 50,
      creditedAccount: new Account({ balance: 50 }),
      debitedAccount: new Account({ balance: 10 }),
    });

    expect(() => transaction.executeTransference()).toThrow(
      InvalidTransactionError,
    );
  });

  it('Should not be able to execute the transference with the own account', () => {
    const account = new Account({ balance: 100 });
    const transaction = new Transaction({
      amount: 50,
      creditedAccount: account,
      debitedAccount: account,
    });

    expect(() => transaction.executeTransference()).toThrow(
      InvalidTransactionError,
    );
  });
});
