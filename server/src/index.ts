import { Hono } from "hono";
import { getSupabase, supabaseMiddleware } from "./middleware/auth.middleware";

const app = new Hono();
app.use("*", supabaseMiddleware());

app.get("/api/user", async (c) => {
  const supabase = getSupabase(c);
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  return c.json({
    message: "You are logged in!",
    userId: data.user,
  });
});

app.get("/signin", async (c) => {
  const supabase = getSupabase(c);
  await supabase.auth.signInWithPassword({
    email: "test@example.com",
    password: "superman99",
  });

  return c.json({
    message: "Signed in server-side!",
  });
});

app.get("/signout", async (c) => {
  const supabase = getSupabase(c);
  await supabase.auth.signOut();

  return c.json({
    message: "Signed out server-side!",
  });
});

app.get("/countries", async (c) => {
  const supabase = getSupabase(c);
  const { data, error } = await supabase.from("countries").select("*");
  if (error) console.log(error);
  return c.json(data);
});

export default app;
