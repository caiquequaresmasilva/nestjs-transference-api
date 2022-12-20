export class InvalidFieldsError extends Error {
  constructor(message = 'Invalid fields') {
    super(message);
  }
}
