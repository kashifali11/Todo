import { Err, Ok, Result } from "oxide.ts";
import { BaseEntity } from "../base-entity";
import { ITodo } from "./ITodo";
import { v4 as uuid } from "uuid";
import guards from "@src/domain/utils/guards";
import { ValidationError } from "@src/domain/exceptions";

interface CreateTodoEntityProps extends Omit<ITodo, "id"> {
  id?: string;
}

export class TodoEntity extends BaseEntity {
  public description: string;
  public title: string;

  constructor({ description, title, id }: ITodo) {
    super({ id: id });
    this.description = description;
    this.title = title;
  }

  static create(
    props: CreateTodoEntityProps
  ): Result<TodoEntity, ValidationError> {
    const todoId = props.id || uuid();
    if (
      guards.isStringEmpty(props.title) ||
      guards.isStringEmpty(props.description)
    ) {
      return Err(new ValidationError("Invalid inputs"));
    }
    return Ok(new TodoEntity({ ...props, id: todoId }));
  }
}
