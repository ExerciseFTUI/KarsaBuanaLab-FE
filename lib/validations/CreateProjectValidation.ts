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
  contactPerson: z.string().min(2, {
    message: "Please input title more than 5 words",
  }),
  valuasiProject: z
    .any()
    .refine((value) => typeof value === "string" || typeof value === "number", {
      message: "Valuasi Project must be a string or number",
    })
    .optional(),
  numRevisi: z.number().optional(),
  is_paid: z.boolean().optional(),
  desc_failed: z
    .string()
    .max(280, { message: "Makismal 280 character" })
    .optional(),
  status: z.string().optional(),
  password: z.string().optional(),
  projectType: z.string().min(2, {
    message: "Please input title more than 5 words",
  }),
});

export type createProjectValidation = z.infer<typeof createProjectValidation>;
