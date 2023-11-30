import { Err, Ok, Result } from "oxide.ts";
import { InputValidationError } from "../AppErrors";
import { z } from "zod";
import { TodoEntity } from "@src/domain/entities/todo/todo-entity";
import { ValidationError } from "@src/domain/exceptions";

type CreateTodoDTOProps = {
  title: string;
  description: string;
};
export class CreateTodoDTO {
  todoEntity: Result<TodoEntity, ValidationError>;
  constructor({ title, description }: CreateTodoDTOProps) {
    this.todoEntity = TodoEntity.create({ title, description });
  }

  static create(
    props: CreateTodoDTOProps
  ): Result<CreateTodoDTO, InputValidationError> {
    console.log(props);
    const todoSchema = z.object({
      title: z.string(),
      description: z.string(),
    });
    const result = todoSchema.safeParse(props);
    if (!result.success) {
      return Err(new InputValidationError(result.error.message));
    }
    return Ok(new CreateTodoDTO(props));
  }
}
