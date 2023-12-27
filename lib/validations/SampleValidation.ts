import { z } from "zod";

const parameterSchema = z.object({
  name: z.string().min(5, {
    message: "Please input a name with more than 5 characters",
  }),
  limit: z.number(),
});

export const sampleValidation = z.object({
  nameSample: z.string().min(5, {
    message: "Please input a title with more than 5 characters",
  }),
  regulation: z.string().min(5, {
    message: "Please input a title with more than 5 characters",
  }),
  parameter: z.array(parameterSchema),
});

export type SampleValidation = z.infer<typeof sampleValidation>;
