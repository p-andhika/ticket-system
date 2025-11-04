import "@dotenvx/dotenvx/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { supabaseMiddleware } from "./middleware/auth.middleware";
import { authRoute } from "./routes/auth";

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

export default app;
