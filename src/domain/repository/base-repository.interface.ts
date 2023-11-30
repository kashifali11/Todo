import { Result } from "oxide.ts";
import { NotFoundError } from "../exceptions";

export interface IBaseRepository<Entity> {
  add(item: Entity): Result<string, null>;
  findById(id: string): Result<Entity, NotFoundError>;
}
