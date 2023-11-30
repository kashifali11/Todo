import { ITodo } from "@src/domain/entities/todo/ITodo";
import { NotFoundError, ValidationError } from "@src/domain/exceptions";
import { Err, Ok, Result } from "oxide.ts";
import { inject, injectable } from "tsyringe";
import { TodoEntity } from "@src/domain/entities/todo/todo-entity";
import { ITodoRepository } from "@src/domain/repository/todo-repository.inteface";
import { PrismaService } from "../prisma-service";
@injectable()
export class TodoRepository implements ITodoRepository {
  constructor(@inject("IDatabase") readonly prisma: PrismaService) {}

  async add(item: ITodo): Promise<Result<ITodo, null>> {
    const res = await this.prisma.todo.create({ data: item });
    return Ok(res);
  }

  async findById(id: string): Promise<Result<ITodo, NotFoundError>> {
    const item = await this.prisma.todo.findUnique({ where: { id } });
    if (!item) {
      return Err(new NotFoundError());
    }
    return TodoEntity.create(item);
  }
  async findAll(
    page: number,
    limit: number
  ): Promise<Result<Result<ITodo, ValidationError>[], null>> {
    const todos = await this.prisma.todo.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const todoEntities = todos.map((todo) => TodoEntity.create(todo));
    return Ok(todoEntities);
  }

  async remove(id: string): Promise<Result<ITodo, Error>> {
    try {
      const todo = await this.prisma.todo.delete({ where: { id } });
      return Ok(todo);
    } catch (error) {
      return Err(error as Error);
    }
  }

  async findCount(): Promise<Result<number, null>> {
    const count = await this.prisma.todo.count();
    return Ok(count);
  }
}
