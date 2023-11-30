import { Config } from "@src/app/ports/config.interface";
import dotenv from "dotenv";
dotenv.config();

export default {
  app: {
    PORT: process.env.PORT!,
  },
  database: {
    DATABASE_URL: process.env.DATABASE_URL!,
  },
} satisfies Config;
