import { Result } from "oxide.ts";
import { NotFoundError } from "../exceptions";

export interface IBaseRepository<Entity> {
  add(item: Entity): Promise<Result<Entity, null>>;
  findById(id: string): Promise<Result<Entity, NotFoundError>>;
  remove(id: string): Promise<Result<string, NotFoundError>>;
}
