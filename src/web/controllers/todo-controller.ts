import { CreateTodoDTO } from "@src/app/dtos/create-todo";
import { TodoService } from "@src/app/services/todo";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ExecutionService } from "../utils/execution-service";

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
}
