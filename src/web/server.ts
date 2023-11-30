import "reflect-metadata";
import "@src/infra/utils/di-container";
import http from "http";
import app from "./bootstrap/app";
import config from "@src/infra/config";
import { container } from "tsyringe";
import { ILogger } from "@src/app/ports/logger.interface";

const server = http.createServer(app);
const logger = container.resolve<ILogger>("ILogger");

const port = config.app.PORT || 8000;
server.listen(port, () => {
  logger.info(`Server is listening on ${port}`);
});
