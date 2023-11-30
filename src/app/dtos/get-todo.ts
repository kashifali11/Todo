import { Err, Ok, Result } from "oxide.ts";
import { InputValidationError } from "../AppErrors";
import { z } from "zod";

type GetTodoProps = {
  id: string;
};
export class GetTodoDTO {
  id: string;
  constructor({ id }: GetTodoProps) {
    this.id = id;
  }

  static create(props: GetTodoProps): Result<GetTodoDTO, InputValidationError> {
    const todoSchema = z.object({
      id: z.string(),
    });
    const result = todoSchema.safeParse(props);
    if (!result.success) {
      return Err(new InputValidationError(result.error.message));
    }
    return Ok(new GetTodoDTO(props));
  }
}
