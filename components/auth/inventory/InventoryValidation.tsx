import { z } from "zod";

export const inventoryValidation = z.object({
  tool: z.string().min(3, {
    message: "Tool name is Required",
  }),
  description: z.string().min(3, {
    message: "Description is Required",
  }),
  category: z.string().min(3, {
    message: "Condition is Required",
  }),
  maintenanceEvery: z.string().min(3, {
    message: "Maintenance is Required",
  }),
  deadline: z.coerce
    .date({
      required_error: "Deadline is Required",
    })
    .optional(),
  vendor: z.string({ required_error: "Vendor is required" }).min(3, {
    message: "Vendor is Required",
  }),
});

export type inventoryValidationType = z.infer<typeof inventoryValidation>;
