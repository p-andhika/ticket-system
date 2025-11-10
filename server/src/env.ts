import "@dotenvx/dotenvx/config";
import { z, ZodError } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.string().default("debug"),
  HONO_SUPABASE_URL: z.url(),
  HONO_SUPABASE_KEY: z.string(),
  HONO_SUPABASE_ADMIN_KEY: z.string(),
});

type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
} catch (error) {
  const zodError = error as ZodError;

  console.error("❌ Invalid env:");
  console.error(zodError.flatten().fieldErrors);

  process.exit(1);
}

export default env;
