import { z } from "zod";

export const surveyValidation = z.object({
  question1: z.string().min(3, {
    message: "question1 is Required",
  }),
  question2: z.string().min(3, {
    message: "question1 is Required",
  }),
  question3: z.string().min(3, {
    message: "question1 is Required",
  }),
});

export type surveyValidationType = z.infer<typeof surveyValidation>;
