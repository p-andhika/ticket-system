import { z } from "zod";

export const emailSchema = z
  .email("Email format is invalid")
  .min(1, "Email is required");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const signinSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  // firstName: z.string().min(1, "First name is required"),
  // lastName: z.string().min(1, "Last name is required"),
});

export type SigninCredentials = z.infer<typeof signinSchema>;
export type SignupCredentials = z.infer<typeof signupSchema>;
