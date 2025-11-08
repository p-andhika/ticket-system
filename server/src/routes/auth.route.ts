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
      const response = await supabase.auth.admin.generateLink({
        email: body.email,
        type: "magiclink",
      });

      // TODO: Use the response to create mail template

      return c.json({
        data: {
          message: "Magic link success",
        },
      });
    })

    .post("/verify-otp", async (c) => {
      const body = await c.req.json();
      const supabase = getSupabase(c);
      const response = await supabase.auth.verifyOtp({
        type: "magiclink",
        token_hash: body.hashedToken,
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
