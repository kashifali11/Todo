import BunyanLogger from "bunyan";
import ExpressBunyanLogger from "express-bunyan-logger";
class Logger {
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

export default new Logger();
