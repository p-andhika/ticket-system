import "@dotenvx/dotenvx/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getSupabase, supabaseMiddleware } from "./middleware/auth.middleware";

const app = new Hono();
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("*", supabaseMiddleware());

app.get("/api/v1/user", async (c) => {
  const supabase = getSupabase(c);
  const { data } = await supabase.auth.getUser();

  return c.json(data);
});

app.post("/api/v1/signin", async (c) => {
  const body = await c.req.json();
  const supabase = getSupabase(c);
  const response = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  return c.json(response);
});

app.get("/api/v1/signout", async (c) => {
  const supabase = getSupabase(c);
  await supabase.auth.signOut();

  return c.json({
    message: "Signed out server-side!",
  });
});

export default app;
