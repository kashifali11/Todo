export class DomainError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export class ValidationError extends DomainError {
  constructor(m: string) {
    super(`Validation Error: ${m}`);
  }
}

export class NotFoundError extends DomainError {
  constructor(m?: string) {
    super(`Could not find the requested resource. ${m || ""}`);
  }
}
