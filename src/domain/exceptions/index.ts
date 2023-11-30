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

export class NotFoundError extends DomainException {
  constructor(m?: string) {
    super(`Could not find the requested resource. ${m || ""}`);
  }
}
