import { ILogger } from "@src/app/ports/logger.interface";
import BunyanLogger from "bunyan";
import ExpressBunyanLogger from "express-bunyan-logger";
import { injectable } from "tsyringe";

@injectable()
class Logger implements ILogger {
  private logger: BunyanLogger;
  constructor() {
    this.logger = BunyanLogger.createLogger({
      name: "todo-app",
      level: "info",
    });
  }

  info(...data: any[]) {
    this.logger.info(data);
  }

  debug(...data: any) {
    this.logger.debug(data);
  }

  error(...data: any) {
    this.logger.error(data);
  }

  warn(...data: any) {
    this.logger.warn(data);
  }
}

export const AppLogger = ExpressBunyanLogger();

export default Logger;
