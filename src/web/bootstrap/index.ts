import "reflect-metadata";
import "@src/infra/utils/di-container";
import express from "express";
import useRoutes from "../routes";
import { AppLogger } from "@src/infra/logger";

const app = express();
app.use(express.json());
app.use(AppLogger);
useRoutes(app);

export default app;
