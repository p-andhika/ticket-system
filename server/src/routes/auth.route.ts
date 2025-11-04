import { getSupabase } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

export const authRoute = new Hono()
  .post("/signin", async (c) => {
    const body = await c.req.json();
    const supabase = getSupabase(c);
    const response = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    return c.json(response);
  })

  .get("/signout", async (c) => {
    const supabase = getSupabase(c);
    await supabase.auth.signOut();

    return c.json({
      message: "Signed out server-side!",
    });
  })

  .get("/user", async (c) => {
    const supabase = getSupabase(c);
    const { data } = await supabase.auth.getUser();

    return c.json(data);
  });
