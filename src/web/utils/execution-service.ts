import { AppError, AppErrors, InputValidationError } from "@src/app/AppErrors";
import { ILogger } from "@src/app/ports/logger.interface";
import {
  DomainError,
  NotFoundError,
  ValidationError,
} from "@src/domain/exceptions";
import { Response } from "express";
import { Result } from "oxide.ts";
import { inject, injectable } from "tsyringe";

@injectable()
export class ExecutionService {
  constructor(@inject("ILogger") private readonly logger: ILogger) {}

  private buildErrorResponse(error: DomainError | AppError) {
    let status = AppErrors.GENERIC;
    if (error instanceof NotFoundError) {
      status = AppErrors.NOT_FOUND;
    } else if (
      error instanceof ValidationError ||
      error instanceof InputValidationError
    ) {
      status = AppErrors.VALIDATION;
    }
    this.logger.error(error);
    return { status, message: error.message || "Internal server Error" };
  }

  async execute<T>(
    res: Response,
    service: Function,
    dto: Result<T, DomainError | AppError>
  ) {
    try {
      if (dto.isErr()) {
        const response = this.buildErrorResponse(dto.unwrapErr());
        return res.status(response.status).json({ message: response.message });
      }
      const result = await service(dto.unwrap());
      if (result.isErr()) {
        const response = this.buildErrorResponse(result.unwrapErr());
        this.logger.debug("Request Successful");
        return res.status(response.status).json({ message: response.message });
      }
      return res.status(200).json({ data: result.unwrap() });
    } catch (error) {
      this.logger.error(error);
      return res
        .status(AppErrors.GENERIC)
        .json({ message: "Internal Server Error" });
    }
  }
}
