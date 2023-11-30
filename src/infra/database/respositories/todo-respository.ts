import { ITodo } from "@src/domain/entities/todo/ITodo";
import { NotFoundError } from "@src/domain/exceptions";
import { Err, Ok, Result } from "oxide.ts";
import { inject, injectable } from "tsyringe";
import { Todo } from "../models/todo";
import { TodoEntity } from "@src/domain/entities/todo/todo-entity";
import { ITodoRepository } from "@src/domain/repository/todo-repository.inteface";

@injectable()
export class TodoRepository implements ITodoRepository {
  constructor(@inject("TodoModel") readonly todo: Todo) {}
  add(item: ITodo): Result<string, null> {
    this.todo.createRecord(item);
    return Ok("Operation Successful");
  }

  findById(id: string): Result<ITodo, NotFoundError> {
    const item = this.todo.findRecordById(id);
    if (!item) {
      return Err(new NotFoundError());
    }
    return TodoEntity.create(item);
  }
}
