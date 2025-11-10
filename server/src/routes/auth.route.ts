import { AppApi } from "@/lib/types";
import { getSupabase } from "@/middlewares/auth.middleware";
import nodemailer from "nodemailer";

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

        const constructedLink = new URL(
          `/api/v1/auth/verify-otp?hashed_token=${hashed_token}`,
          c.req.url,
        );

        const transporter = nodemailer.createTransport({
          host: "localhost",
          port: 54325,
        });

        await transporter.sendMail({
          from: "Your Company <your@mail.whatever>",
          to: body.email,
          subject: "Magic Link",
          html: `“<h1>Hi there, this is a custom magic link email!</h1>
  <p>Click <a href="${constructedLink.toString()}">here</a> to log 
    in.</p>”

Excerpt From
Building Production-Grade Web Applications with Supabase
David Lorenz
This material may be protected by copyright.`,
        });

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
      }

      return c.json({
        data: {
          message: "Magic link sent!",
        },
        error: null,
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
