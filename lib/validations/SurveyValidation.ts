import { z } from "zod";

export const surveyValidation = z.object({
  question1: z.string().min(3, {
    message: "question1 is Required",
  }),
  question2: z.string().min(3, {
    message: "question2 is Required",
  }),
  question3: z.string().min(3, {
    message: "question3 is Required",
  }),
  question4: z.string().min(3, {
    message: "question4 is Required",
  }),
  question5: z.string().min(3, {
    message: "question5 is Required",
  }),
  question6: z.string().min(3, {
    message: "question6 is Required",
  }),
  question7: z.string().min(3, {
    message: "question7 is Required",
  }),
  question8: z.string().min(3, {
    message: "question8 is Required",
  }),
});

export type surveyValidationType = z.infer<typeof surveyValidation>;
