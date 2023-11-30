import express from "express";
import { container } from "tsyringe";
import { TodoController } from "../controllers/todo-controller";
const todoRouter = express.Router();

const todoController = container.resolve(TodoController);

todoRouter.post("/todo", todoController.createTodo);

export default todoRouter;
