export class InvalidTransactionError extends Error {
  constructor() {
    super('Invalid transaction');
  }
}
