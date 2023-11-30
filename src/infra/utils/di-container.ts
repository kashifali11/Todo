import { container } from "tsyringe";
import { TodoRepository } from "../database/respositories/todo-respository";
import { ExecutionService } from "@src/web/utils/execution-service";
import { TodoService } from "@src/app/services/todo";
import Logger from "../logger";
import { PrismaService } from "../database/prisma-service";

container.register("ITodoRepository", { useClass: TodoRepository });
container.register("ExecutionService", { useClass: ExecutionService });
container.register("TodoService", { useClass: TodoService });
container.register("ILogger", { useClass: Logger });
container.register("IDatabase", { useClass: PrismaService });
