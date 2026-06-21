export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Operational errors are predictable errors (e.g., user input errors, record not found)
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
