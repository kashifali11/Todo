import "reflect-metadata";
import "@src/infra/utils/di-register";
import express from "express";
import useRoutes from "../routes";
import logger from "@src/infra/logger";
import config from "@src/infra/config";

const app = express();
app.use(express.json());
useRoutes(app);

const port = config.app.PORT || 8000;
app.listen(port, () => {
  logger.info(`Server is listening on ${port}`);
});

export default app;
