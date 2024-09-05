import { z } from "zod";

export const inventoryValidationV2 = z.object({
  tool: z.string().min(3, {
    message: "Tool name is Required",
  }),
  description: z.string().min(5, {
    message: "Description is Required",
  }),
  category: z.string().min(3, {
    message: "Category is Required",
  }),
  vendor: z.string().min(3, {
    message: "Vendor is Required",
  }),
  maintenanceEvery: z.string().min(3, {
    message: "Maintenance is Required",
  }),
  deadline: z.coerce
    .date({
      required_error: "Deadline is Required",
    })
    .optional(),
});

export type inventoryValidationType = z.infer<typeof inventoryValidationV2>;
