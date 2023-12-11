import { DomainError } from "@src/domain/exceptions";
import { ITodoRepository } from "@src/domain/repository/todo-repository.inteface";
import { Err, Ok, Result } from "oxide.ts";
import { inject, injectable } from "tsyringe";
import { CreateTodoDTO } from "../dtos/create-todo";
import { AppError } from "../AppErrors";
import { GetTodoDTO } from "../dtos/get-todo";
import { GetPaginatedTodosDTO } from "../dtos/get-paginated-todos-dto";
import { Paginated } from "@src/domain/utils/pagination";

@injectable()
export class TodoService {
  constructor(
    @inject("ITodoRepository") private readonly todoRepository: ITodoRepository
  ) {}

  addTodo = async (
    createTodoDto: CreateTodoDTO
  ): Promise<Result<string, AppError | DomainError>> => {
    const result = createTodoDto.todoEntity.map((item) => item);
    if (result.isErr()) {
      return result;
    }
    await this.todoRepository.add(result.unwrap());
    return Ok("Operation successful");
  };

  getTodo = async (getTodoDto: GetTodoDTO) => {
    const id = getTodoDto.id;
    return this.todoRepository.findById(id);
  };

  getPaginatedTodos = async (getPaginatedTodosDto: GetPaginatedTodosDTO) => {
    const result = await this.todoRepository.findAll(
      getPaginatedTodosDto.page,
      getPaginatedTodosDto.limit
    );
    const totalRecords = await this.todoRepository.findCount();
    return result.map((items) => {
      return Paginated.create({
        data: items.map((item) => item.unwrap()),
        page: getPaginatedTodosDto.page,
        limit: getPaginatedTodosDto.limit,
        totalRecords: totalRecords.unwrap(),
      });
    });
  };
}
