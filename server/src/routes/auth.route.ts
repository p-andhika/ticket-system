import { AppApi } from "@/lib/types";
import { getSupabase } from "@/middlewares/auth.middleware";

export default function authRoute(app: AppApi) {
  app
    .post("/signup", async (c) => {
      const body = await c.req.json();
      const supabase = getSupabase(c);
      const response = await supabase.auth.signUp({
        email: body.email,
        password: body.password,
      });

      return c.json(response);
    })

    .post("/magic-link", async (c) => {
      const body = await c.req.json();
      const supabase = getSupabase(c);
      const response = supabase.auth.signInWithOtp({
        email: body.email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: "http//:localhost:5173/todo",
        },
      });

      return c.json(response);
    })

    .post("/signin", async (c) => {
      const body = await c.req.json();
      const supabase = getSupabase(c);
      const response = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
      });

      return c.json(response);
    })

    .post("/signout", async (c) => {
      const supabase = getSupabase(c);
      await supabase.auth.signOut();

      return c.json({
        data: {
          message: "Signed out server-side!",
        },
      });
    })

    .get("/user", async (c) => {
      const supabase = getSupabase(c);
      const { data } = await supabase.auth.getUser();

      return c.json(data);
    });

  return app;
}
