import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Validation schema for lembar_data (LD)
const lembarDataValidation = z.string().nonempty("Lembar Data is required"); // Changed to string for ID

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

// Default values type
type DefaultValues = {
  sample: {
    param: {
      unit: string;
      method: string[];
      lembar_data: string;
    }[];
  };
};

// Hook for form handling with proper types
export const useLabForm = (props?: { defaultValues?: DefaultValues }) => {
  const form = useForm({
    defaultValues: props?.defaultValues,
    resolver: zodResolver(labInputDocumentValidation),
  });
  return form;
};
