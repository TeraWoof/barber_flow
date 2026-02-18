import { z } from "zod";

export const subscriptionSchema = z.object({
  plan_type: z.enum(["base", "pro"]),
  billing_cycle: z.enum(["monthly", "quarterly", "yearly"]),
  whatsapp_enabled: z.boolean(),
});
