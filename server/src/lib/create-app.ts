import { AppBindings } from "@/lib/types";
import { supabaseMiddleware } from "@/middlewares/auth.middleware";
import { logger } from "@/middlewares/logger.middleware";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { notFound, onError } from "stoker/middlewares";

export default function createApp() {
  const app = new Hono<AppBindings>({
    strict: false,
  });

  app.use(
    "*",
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      // allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      // allowHeaders: ["Content-Type", "Authorization"],
      // exposeHeaders: ["Set-Cookie"],
    }),
  );
  app.use("*", supabaseMiddleware());
  app.use(logger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
