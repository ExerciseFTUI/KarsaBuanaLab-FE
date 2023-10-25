import { z } from "zod";

export const createSamplingSchema = z.object({
  sampling: z.string().min(5, { message: "Minimum five character" }),
  parameters: z.array(z.string()),
});

export type createSamplingSchemaType = z.infer<typeof createSamplingSchema>;
