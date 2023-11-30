import { AppError, AppErrors, InputValidationError } from "@src/app/AppErrors";
import { IEntity } from "@src/domain/entities/base-entity";
import {
  DomainException,
  NotFoundError,
  ValidationError,
} from "@src/domain/exceptions";
import logger from "@src/infra/logger";
import { Response } from "express";
import { Result } from "oxide.ts";
import { injectable } from "tsyringe";

@injectable()
export class ExecutionService {
  private buildErrorResponse(error: DomainException | AppError) {
    let status = AppErrors.GENERIC;
    if (error instanceof NotFoundError) {
      status = AppErrors.NOT_FOUND;
    } else if (
      error instanceof ValidationError ||
      error instanceof InputValidationError
    ) {
      status = AppErrors.VALIDATION;
    }
    logger.error(error);
    return { status, message: error.message || "Internal server Error" };
  }

  execute<T, U>(
    res: Response,
    service: Function,
    dto: Result<T, DomainException | AppError>
  ) {
    try {
      if (dto.isErr()) {
        const response = this.buildErrorResponse(dto.unwrapErr());
        return res.status(response.status).json({ message: response.message });
      }
      const result = service(dto.unwrap());
      if (result.isErr()) {
        const response = this.buildErrorResponse(result.unwrapErr());
        logger.debug("Todo created.");
        return res.status(response.status).json({ message: response.message });
      }
      return res.status(200).json({ data: result.unwrap() });
    } catch (error) {
      logger.error(error);
      return res
        .status(AppErrors.GENERIC)
        .json({ message: "Internal Server Error" });
    }
  }
}
