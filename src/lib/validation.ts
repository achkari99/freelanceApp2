import { z } from "zod";

export const startProjectSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Provide your company or team"),
  timeline: z.string().min(2, "Select a timeline"),
  services: z.array(z.string()).min(1, "Select at least one focus area"),
  budget: z.string().min(2, "Share a budget range"),
  description: z.string().min(10, "Add a bit more detail"),
  hear: z.string().optional(),
  slackChannel: z.string().optional(),
  slackInvite: z.boolean().default(true)
});

export type StartProjectPayload = z.infer<typeof startProjectSchema>;
