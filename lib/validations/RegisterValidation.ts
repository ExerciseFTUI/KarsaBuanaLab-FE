import { z } from "zod";

export const registerValidation = z
  .object({
    username: z.string().min(3, {
      message: "Username is Required",
    }),
    email: z.string().email({
      message: "Email is Required",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
    role: z.string().nonempty({
      message: "Role is Required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type registerValidationType = z.infer<typeof registerValidation>;
