import { sendMail } from "@/lib/send-mail";
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

      if (response.data.properties) {
        const user = response.data.user;
        const { hashed_token, verification_type } = response.data.properties;

        if (verification_type === "signup") {
          await supabase.auth.admin.deleteUser(user.id);
          return c.json({
            data: {
              message: null,
            },
            error: {
              status: 400,
              code: "invalid_credentials",
            },
          });
        }

        sendMail({
          type: "magicLink",
          hashed_token,
          origin: c.req.header("Origin") ?? "",
          recipient: body.email,
        });
      }

      return c.json({
        data: {
          message: "Magic link sent!",
        },
        error: null,
      });
    })

    .post("/forgot-password", async (c) => {
      const body = await c.req.json();
      const supabase = getSupabase(c);
      const response = await supabase.auth.admin.generateLink({
        email: body.email,
        type: "recovery",
      });

      if (response.data.properties) {
        const { hashed_token } = response.data.properties;

        sendMail({
          type: "forgotPassword",
          hashed_token,
          origin: c.req.header("Origin") ?? "",
          recipient: body.email,
        });

        return c.json({
          data: {
            message: "Forgot password link sent!",
          },
          error: null,
        });
      }

      return c.json(response);
    })

    .post("/reset-password", async (c) => {
      const body = await c.req.json();
      const supabase = getSupabase(c);
      const response = await supabase.auth.updateUser({
        password: body.newPassword,
      });

      if (response.error) {
        return c.json({
          ...response,
          error: {
            ...response.error,
            code: "invalid_token",
          },
        });
      }

      return c.json({
        data: {
          message: "Reset password success!",
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
