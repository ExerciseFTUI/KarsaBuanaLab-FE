import { z } from "zod";

export const scheduleValidation = z.object({
  comment: z.string(),
});

export type scheduleValidationType = z.infer<typeof scheduleValidation>;