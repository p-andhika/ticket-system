import { supabaseMiddleware } from "@/middlewares/auth.middleware";
import { logger } from "@/middlewares/logger.middleware";
import { authRoute } from "@/routes/auth";
import "@dotenvx/dotenvx/config";
import { Hono } from "hono";
import { PinoLogger } from "hono-pino";
import { cors } from "hono/cors";
import { notFound, onError } from "stoker/middlewares";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

const app = new Hono<AppBindings>();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("*", supabaseMiddleware());
app.use(logger());

app.get("/error", () => {
  throw new Error("Something went wrong!");
});

app.route("/api/v1/auth", authRoute);

app.notFound(notFound);
app.onError(onError);

export default app;
