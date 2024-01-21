export default class ValidationError extends Error {
  public statusCode: number;
  constructor(message: any, status: number) {
    super(message);
    this.statusCode = status;
  }
}
