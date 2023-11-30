import { container } from "tsyringe";
import { TodoRepository } from "../database/respositories/todo-respository";
import { ExecutionService } from "@src/web/utils/execution-service";
import { TodoService } from "@src/app/services/todo";
import { Todo } from "../database/models/todo";
import { TodoController } from "@src/web/controllers/todo-controller";

container.register("ITodoRepository", { useClass: TodoRepository });
container.register("ExecutionService", { useClass: ExecutionService });
container.register("TodoService", { useClass: TodoService });
container.register("TodoModel", { useClass: Todo });
container.register("TodoController", { useClass: TodoController });
