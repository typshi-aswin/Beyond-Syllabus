import "dotenv/config";
import { z } from "zod";

console.log("🔐 Loading environment variables...");

const serverSchema = z.object({
  NODE_ENV: z.string(),
  CORS_ORIGIN: z.string().optional(),
  PORT: z.coerce.number().default(3000),
});

const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  console.error("❌ Invalid environment variables:\n");
  _serverEnv.error.issues.forEach((issue) => {
    console.error(issue);
  });
  throw new Error("Invalid environment variables");
}

const {
  NODE_ENV,
  CORS_ORIGIN,
  PORT,
} = _serverEnv.data;

export const env = {
  NODE_ENV,
  CORS_ORIGIN,
  PORT,
};
console.log("✅ Environment variables loaded");
