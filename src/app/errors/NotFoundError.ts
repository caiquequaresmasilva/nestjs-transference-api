export class NotFoundError extends Error {
  constructor(message = 'Entity not found') {
    super(message);
  }
}
