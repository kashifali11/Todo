import { CreateTodoDTO } from "@src/app/dtos/create-todo";
import { TodoService } from "@src/app/services/todo";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ExecutionService } from "../utils/execution-service";
import { GetTodoDTO } from "@src/app/dtos/get-todo";
import { GetPaginatedTodosDTO } from "@src/app/dtos/get-paginated-todos-dto";

@injectable()
export class TodoController {
  constructor(
    @inject("TodoService") private readonly todoService: TodoService,
    @inject("ExecutionService")
    private readonly executionService: ExecutionService
  ) {}

  createTodo = (req: Request, res: Response) => {
    const dtoResult = CreateTodoDTO.create(req.body);
    return this.executionService.execute(
      res,
      this.todoService.addTodo,
      dtoResult
    );
  };

  getTodo = (req: Request<{ id: string }>, res: Response) => {
    const dtoResult = GetTodoDTO.create(req.params);
    return this.executionService.execute(
      res,
      this.todoService.getTodo,
      dtoResult
    );
  };

  getAll = (req: Request<{ limit: number; page: number }>, res: Response) => {
    const dtoResult = GetPaginatedTodosDTO.create(req.params);
    return this.executionService.execute(
      res,
      this.todoService.getPaginatedTodos,
      dtoResult
    );
  };
}
