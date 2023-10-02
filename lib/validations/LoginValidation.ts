import { z } from "zod";

export const loginValidation = z.object({
  username: z.string().min(3, {
    message: "Username is Required",
  }),
  password: z.string().min(3, {
    message: "Password is Required",
  }),
});

export type loginValidationType = z.infer<typeof loginValidation>;
