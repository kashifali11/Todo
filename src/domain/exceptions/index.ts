export class DomainException extends Error {
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class ValidationError extends DomainException {
  constructor(m: string) {
    super(`Validation Error: ${m}`);
  }
}

export class DatabaseError extends DomainException {
  constructor(m: string) {
    super(`Database Error: ${m}`);
  }
}

export class NotFoundError extends DomainException {
  constructor(m: string) {
    super(`Not Found: ${m}`);
  }
}
