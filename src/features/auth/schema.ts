import { z } from "zod";
import { AUTH_CONFIG } from "@/lib/constants";

export const signUpSchema = z
  .object({
    email: z.email("Email must be a valid email address"),
    password: z.string().min(AUTH_CONFIG.MIN_PASSWORD_LENGTH, `Password must be at least ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} characters`), 
    confirmPassword: z
      .string()
      .min(AUTH_CONFIG.MIN_PASSWORD_LENGTH, `Confirm password must be at least ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} characters`),
    name: z.string().min(2, "Name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpDefaultValues: z.input<typeof signUpSchema.shape> = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

export const signInSchema = z.object({
  email: z.email("Email must be a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signIndefaultValues: z.input<typeof signInSchema> = {
  email: "",
  password: "",
};