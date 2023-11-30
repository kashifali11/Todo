import { Express } from "express";
import todoRouter from "./todo";

const useRoutes = (app: Express) => {
  app.use(todoRouter);
};

export default useRoutes;
