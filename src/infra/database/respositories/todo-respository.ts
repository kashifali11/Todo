import { ITodo } from "@src/domain/entities/todo/ITodo";
import { NotFoundError } from "@src/domain/exceptions";
import { Err, Ok, Result } from "oxide.ts";
import { inject, injectable } from "tsyringe";
import { TodoEntity } from "@src/domain/entities/todo/todo-entity";
import { ITodoRepository } from "@src/domain/repository/todo-repository.inteface";
import { PrismaService } from "../prisma-service";
@injectable()
export class TodoRepository implements ITodoRepository {
  constructor(@inject("IDatabase") readonly prisma: PrismaService) {}

  async add(item: ITodo): Promise<Result<ITodo, null>> {
    await this.prisma.todo.create({ data: item });
    return Ok(item);
  }

  async findById(id: string): Promise<Result<ITodo, NotFoundError>> {
    const item = null;
    if (!item) {
      return Err(new NotFoundError());
    }
    return TodoEntity.create(item);
  }

  remove(id: string): Promise<Result<string, NotFoundError>> {
    throw new Error("Method not implemented.");
  }
}
