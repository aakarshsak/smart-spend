export default class CustomError extends Error {
  public statusCode: number;
  constructor(messaage: string, status: number) {
    super(messaage);
    this.statusCode = status;
  }
}
