import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const parameterInputValidation = z.object({
  unit: z.string({ required_error: "Required Field" }).min(1, "Required Field"),
  method: z
    .string({ required_error: "Required Field" })
    .min(1, "Required Field"),
  result: z
    .string()
    .refine((result) => !isNaN(parseFloat(result)), {
      message: "Required Field",
    })
    .transform((result) => Number(result)),
});

export const sampleInputValidation = z.object({
  parameter: z.array(parameterInputValidation),
});

export const labInputDocumentValidation = z.object({
  sample: z.array(sampleInputValidation),
});

//Hook
export type labInputDocumentValidationType = z.infer<
  typeof labInputDocumentValidation
>;

export const form = () =>
  useForm<labInputDocumentValidationType>({
    resolver: zodResolver(labInputDocumentValidation),
  });
