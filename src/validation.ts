import { z } from "zod";

export const OptionValidationSchema = z.object({
  id: z.number(),
  label: z.string(),
});

export const FormValidationSchema = z.object({
  relations: OptionValidationSchema,
  positions: OptionValidationSchema.array().min(1),
  name: z.string().min(5),
  description: z.string().min(10),
});
