// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// export const parameterInputValidation = z.object({
//   unit: z
//     .string({ required_error: "Required Field" })
//     // .min(1, "Required Field")
//     .refine((value) => value !== null, {
//       message: "Required Field",
//     }),
//   method: z
//     .string({ required_error: "Required Field" })
//     .array()
//     // .min(1, "Required Field").array()
//     //transform if the value just one or it means just a string change it to array
//     .transform((value) => {
//       if (typeof value === "string") {
//         return [value];
//       }
//       return value;
//     }),
// });

// export const sampleInputValidation = z.object({
//   parameter: z.array(parameterInputValidation),
// });

// export const labInputDocumentValidation = z.object({
//   sample: z.array(sampleInputValidation),
// });

// //Hook
// export type labInputDocumentValidationType = z.infer<
//   typeof labInputDocumentValidation
// >;

// export const useLabForm = () => {
//   const form = useForm<labInputDocumentValidationType>({
//     resolver: zodResolver(labInputDocumentValidation),
//   });

//   return form;
// };

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
