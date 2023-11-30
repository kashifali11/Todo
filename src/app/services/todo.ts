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

  addTodo = async (
    todoDto: CreateTodoDTO
  ): Promise<Result<string, AppError | DomainException>> => {
    const result = todoDto.todoEntity.map((item) => item);
    if (result.isErr()) {
      return result;
    }
    await this.todoRepository.add(result.unwrap());
    return Ok("Operation successful");
  };
}
