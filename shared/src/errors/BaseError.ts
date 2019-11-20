export default class BaseError extends Error {
  status: number = 500;

  constructor(message: string) {
    super(message);
  }
}
