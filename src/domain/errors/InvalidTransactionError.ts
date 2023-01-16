export class InvalidTransactionError extends Error {
  constructor(message = 'Invalid transaction') {
    super(message);
  }
}
