export class AppError extends Error {
  constructor(m: string) {
    super(m);
  }
}

export class InputValidationError extends AppError {
  constructor(m: string) {
    super(`Invalid Input: ${m}`);
  }
}

export enum AppErrors {
  NOT_FOUND = 404,
  VALIDATION = 400,
  GENERIC = 500,
}
