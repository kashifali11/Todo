import { Result } from "oxide.ts";
import { DatabaseError, NotFoundError } from "../exceptions";

export interface IBaseRepository<Entity> {
  add(item: Entity): Result<string, DatabaseError>;
  findById(id: string): Result<Entity, NotFoundError>;
}
