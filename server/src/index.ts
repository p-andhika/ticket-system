import { supabaseMiddleware } from "@/middleware/auth.middleware";
import { authRoute } from "@/routes/auth";
import "@dotenvx/dotenvx/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { notFound, onError } from "stoker/middlewares";

const app = new Hono();

app.use(logger());
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("*", supabaseMiddleware());

app.route("/api/v1/auth", authRoute);

app.notFound(notFound);
app.onError(onError);

export default app;
