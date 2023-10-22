import { z } from "zod";

export const clientValidation = z.object({
  resiNumber: z.string().min(3, {
    message: "Resi Number is Required",
  }),
  password: z.string().min(3, {
    message: "Password is Required",
  }),
});

export type clientValidationType = z.infer<typeof clientValidation>;
