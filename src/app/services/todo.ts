import { DomainException } from "@src/domain/exceptions";
import { ITodoRepository } from "@src/domain/repository/todo-repository.inteface";
import { Err, Ok, Result } from "oxide.ts";
import { inject, injectable } from "tsyringe";
import { CreateTodoDTO } from "../dtos/create-todo";
import { AppError } from "../AppErrors";

@injectable()
export class TodoService {
  constructor(
    @inject("ITodoRepository") private readonly todoRepository: ITodoRepository
  ) {}

  addTodo = (
    todoDto: CreateTodoDTO
  ): Result<string, AppError | DomainException> => {
    if (todoDto.todoEntity.isErr()) {
      return Err(todoDto.todoEntity.unwrapErr());
    }
    const todoEntity = todoDto.todoEntity.unwrap();
    const result = this.todoRepository.add(todoEntity);
    if (result.isErr()) {
      return Err(result.unwrapErr());
    }
    return Ok(result.unwrap());
  };
}
