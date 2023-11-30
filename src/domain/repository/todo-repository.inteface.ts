import { ITodo } from "../entities/todo/ITodo";
import { IBaseRepository } from "./base-repository.interface";

export interface ITodoRepository extends IBaseRepository<ITodo> {}
