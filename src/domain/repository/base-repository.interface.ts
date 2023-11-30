import { Result } from "oxide.ts";
import { NotFoundError, ValidationError } from "../exceptions";
import { Paginated, PaginationOptions } from "../pagination";

export interface IBaseRepository<Entity> {
  add(item: Entity): Promise<Result<Entity, null>>;
  findById(id: string): Promise<Result<Entity, NotFoundError>>;
  findAll(
    page: number,
    limit: number
  ): Promise<Result<Result<Entity, ValidationError>[], null>>;
  remove(id: string): Promise<Result<Entity, NotFoundError>>;
  findCount(): Promise<Result<number, null>>;
}
