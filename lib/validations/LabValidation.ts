import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const parameterInputValidation = z.object({
  unit: z
    .string({ required_error: "Required Field" })
    .min(1, "Required Field")
    .refine((value) => value !== null, {
      message: "Required Field",
    }),
  method: z
    .string({ required_error: "Required Field" }).array()
    // .min(1, "Required Field").array()
    //transform if the value just one or it means just a string change it to array
    .transform((value) => {
      if (typeof value === "string") {
        return [value];
      }
      return value;
    }),
  result: z
    .string() // Allow result to be either string or number
    .transform((value) => {
      const parsedValue = Number(value);
      return isNaN(parsedValue) ? value : parsedValue.toString();
    })
    .refine((result) => !isNaN(parseFloat(result)), {
      message: "Result must be a valid number or string representation of a number",
    }),
    // .refine((result) => !isNaN(parseFloat(result)), {
    //   message: "Required Field",
    // })
    // .transform((result) => String(result)),
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

export const useLabForm = () => {
  const form = useForm<labInputDocumentValidationType>({
    resolver: zodResolver(labInputDocumentValidation),
  });

  return form;
};
