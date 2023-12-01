import { Err, Ok, Result } from "oxide.ts";
import { InputValidationError } from "../AppErrors";
import { z } from "zod";
import {
  DefaultPaginationOptions,
  PaginationOptions,
} from "@src/domain/utils/pagination";

type GetPaginatedTodosDTOProps = PaginationOptions;

export class GetPaginatedTodosDTO {
  limit: number;
  page: number;
  constructor({ limit, page }: GetPaginatedTodosDTOProps) {
    this.limit = limit || DefaultPaginationOptions.DEFAULT_LIMIT;
    this.page = page || DefaultPaginationOptions.DEFAULT_PAGE;
  }

  static create(
    props: GetPaginatedTodosDTOProps
  ): Result<GetPaginatedTodosDTO, InputValidationError> {
    const todoSchema = z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    });
    const result = todoSchema.safeParse(props);
    if (!result.success) {
      return Err(new InputValidationError(result.error.message));
    }
    return Ok(new GetPaginatedTodosDTO(props));
  }
}
