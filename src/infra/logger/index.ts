import { ILogger } from "@src/app/ports/logger.interface";
import { injectable } from "tsyringe";
import pino, { BaseLogger } from "pino";
import PinoHttp from "pino-http";
@injectable()
class Logger implements ILogger {
  private logger: BaseLogger;
  constructor() {
    this.logger = pino({
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

export const AppLogger = PinoHttp({ level: "info" });
export default Logger;
