import { z } from "zod";

export const createProjectValidation = z.object({
  title: z.string().min(5, {
    message: "Please input title more than 5 words",
  }),
  numPenawaran: z
    .string()
    .min(5, {
      message: "Please input title more than 5 words",
    })
    .optional(),
  custName: z.string().min(5, {
    message: "Please input title more than 5 words",
  }),
  alamatKantor: z.string().min(5, {
    message: "Please input title more than 5 words",
  }),
  alamatSampling: z.string().min(5, {
    message: "Please input title more than 5 words",
  }),
  surel: z.string().min(5, {
    message: "Please input title more than 5 words",
  }),
  contactPerson: z.string().min(5, {
    message: "Please input title more than 5 words",
  }),
  valuasiProject: z
    .string()
    .min(5, {
      message: "Please input title more than 5 words",
    })
    .optional(),
  numRevisi: z
    .string()
    .min(5, {
      message: "Please input title more than 5 words",
    })
    .optional(),
});

export type createProjectValidation = z.infer<typeof createProjectValidation>;
