import { injectable } from "tsyringe";
import { Database } from "../database";

@injectable()
export class Todo extends Database {
  constructor() {
    super("todo");
  }
}
