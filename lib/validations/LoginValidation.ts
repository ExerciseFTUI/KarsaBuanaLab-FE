import { z } from "zod";

export const loginValidation = z.object({
  email: z
    .string()
    .min(3, {
      message: "Email is Required",
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Invalid email format",
    }),
  password: z.string().min(3, {
    message: "Password is Required",
  }),
});

export type loginValidationType = z.infer<typeof loginValidation>;
