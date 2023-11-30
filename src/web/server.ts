import http from "http";
import app from "./bootstrap";
import config from "@src/infra/config";
import logger from "@src/infra/logger";

const server = http.createServer(app);

const port = config.app.PORT || 8000;
server.listen(port, () => {
  logger.info(`Server is listening on ${port}`);
});
