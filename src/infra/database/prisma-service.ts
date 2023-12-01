import { Prisma, PrismaClient } from "@prisma/client";
import { IDatabase } from "@src/app/ports/database-connection.interface";
import { inject, injectable, singleton } from "tsyringe";
import Logger from "../logger";

const OPTS = {
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
} satisfies Prisma.PrismaClientOptions;

@injectable()
@singleton()
export class PrismaService
  extends PrismaClient<typeof OPTS>
  implements IDatabase
{
  constructor(@inject("ILogger") private readonly logger: Logger) {
    super(OPTS);
    this.$on("query", (e) => {
      this.logger.info(
        `Query: ${e.query}`,
        e.params,
        `Duration: ${e.duration}`
      );
    });
  }

  async connect(): Promise<void> {
    await this.$connect();
  }

  disconnect(): void {
    this.$disconnect();
  }
}
