import "@dotenvx/dotenvx/config";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { setCookie } from "hono/cookie";

declare module "hono" {
  interface ContextVariableMap {
    supabase: SupabaseClient;
  }
}

export const getSupabase = (c: Context) => {
  return c.get("supabase");
};

type SupabaseEnv = {
  HONO_SUPABASE_URL: string;
  HONO_SUPABASE_KEY: string;
};

export const supabaseMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const supabaseEnv = env<SupabaseEnv>(c);
    const supabaseUrl =
      supabaseEnv.HONO_SUPABASE_URL ?? process.env.HONO_SUPABASE_URL;
    const supabasePublishableKey =
      supabaseEnv.HONO_SUPABASE_KEY ?? process.env.HONO_SUPABASE_KEY;

    if (!supabaseUrl) {
      throw new Error("SUPABASE_URL missing!");
    }

    if (!supabasePublishableKey) {
      throw new Error("SUPABASE_KEY missing!");
    }

    const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
      cookies: {
        getAll() {
          return parseCookieHeader(c.req.header("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            // @ts-ignore
            setCookie(c, name, value, options),
          );
        },
      },
    });

    c.set("supabase", supabase);

    await next();
  };
};
