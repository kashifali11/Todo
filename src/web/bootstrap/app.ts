import express from "express";
import useRoutes from "../routes";
import { AppLogger } from "@src/infra/logger";
import { container } from "tsyringe";
import { IDatabase } from "@src/app/ports/database-connection.interface";

const database = container.resolve<IDatabase>("IDatabase");

database.connect();
const app = express();
app.use(express.json());
app.use(AppLogger);
useRoutes(app);

export default app;
