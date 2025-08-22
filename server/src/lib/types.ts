import { Hono } from "hono";
import { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppApi = Hono<AppBindings>;
