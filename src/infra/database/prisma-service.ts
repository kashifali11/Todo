import { PrismaClient } from "@prisma/client";
import { IDatabase } from "@src/app/ports/database-connection.interface";
import { injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class PrismaService extends PrismaClient implements IDatabase {
  constructor() {
    super();
  }

  connect() {
    this.$connect();
  }

  disconnect(): void {}
}
