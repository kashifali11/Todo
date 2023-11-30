import express from "express";
import { container } from "tsyringe";
import { TodoController } from "../controllers/todo-controller";
const todoRouter = express.Router();

const todoController = container.resolve(TodoController);

todoRouter.post("/todo", todoController.createTodo);
todoRouter.get("/todo/:id", todoController.getTodo);
todoRouter.get("/todo", todoController.getAll);

export default todoRouter;
