import { Account } from './Account';
import { InvalidTransactionError } from './errors';

describe('Account domain entity', () => {
  it('Should be able to create an account with a default balance of 100', () => {
    const account = new Account({ balance: 100 });
    expect(account).toBeTruthy();
    expect(account.balance).toEqual(100);
  });

  it('Should be able to do a credit operation', () => {
    const account = new Account();
    account.creditAmount(50);
    expect(account.balance).toEqual(150);
  });

  it('Should be able to do a debit operation when there is sufficient balance', () => {
    const account = new Account();
    account.debitAmount(50);
    expect(account.balance).toEqual(50);
  });

  it('Should not be able to do a debit operation when there is not sufficient balance', () => {
    const account = new Account();
    expect(() => account.debitAmount(200)).toThrow(InvalidTransactionError);
  });
});
