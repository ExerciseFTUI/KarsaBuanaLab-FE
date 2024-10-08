import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Validation schema for lembar_data (LD)
const lembarDataValidation = z.object({
  ld_name: z.string().nonempty("LD Name is required"),
  ld_file_id: z.string().nonempty("LD File ID is required"),
});

export const parameterInputValidation = z.object({
  unit: z
    .string()
    .optional()
    .refine((value) => value !== null, {
      message: "Invalid value",
    }),
  method: z
    .string()
    .array()
    .optional()
    .transform((value) => {
      if (typeof value === "string") {
        return [value];
      }
      return value;
    }),
  lembar_data: lembarDataValidation,
});

// Sample validation schema
export const sampleInputValidation = z.object({
  // sample_name: z.string({ required_error: "Required Field" }),
  param: z.array(parameterInputValidation),
});

// Main validation schema
export const labInputDocumentValidation = z.object({
  sample: sampleInputValidation,
});

// Type for the form data
export type LabInputDocumentValidationType = z.infer<
  typeof labInputDocumentValidation
>;

// Hook for form handling
export const useLabForm = () => {
  const form = useForm<LabInputDocumentValidationType>({
    resolver: zodResolver(labInputDocumentValidation),
  });

  return form;
};
