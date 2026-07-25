import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const sendMessageSchema = z.object({
  content: z.string().trim().min(1, "Type a message before sending"),
});

export function firstFieldError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input";
}
