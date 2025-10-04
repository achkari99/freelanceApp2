import { z } from "zod";

export const PROJECT_REPORT_ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".zip"
] as const;

export const PROJECT_REPORT_ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed"
] as const;

export const PROJECT_REPORT_MAX_SIZE_BYTES = 25 * 1024 * 1024;

const projectReportFileSchema = z.instanceof(File).superRefine((file, ctx) => {
  const name = file.name.toLowerCase();
  const matchesExtension = PROJECT_REPORT_ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension));
  const matchesMime = PROJECT_REPORT_ACCEPTED_MIME_TYPES.some((mimeType) => mimeType === file.type);

  if (!matchesExtension && !matchesMime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Upload a PDF, DOC, DOCX, or ZIP file."
    });
  }

  if (file.size > PROJECT_REPORT_MAX_SIZE_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "File size must be 25 MB or less."
    });
  }
});

const projectReportSchema = z.preprocess(
  (value) => (value === undefined ? null : value),
  z.union([projectReportFileSchema, z.null()])
);

export const startProjectSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Provide your company or team"),
  timeline: z.string().min(2, "Select a timeline"),
  services: z.array(z.string()).min(1, "Select at least one focus area"),
  budget: z.string().min(2, "Share a budget range"),
  description: z.string().min(10, "Add a bit more detail"),
  projectReport: projectReportSchema,
  hear: z.string().optional(),
  slackChannel: z.string().optional(),
  slackInvite: z.boolean().default(true)
});

export type StartProjectPayload = z.infer<typeof startProjectSchema>;
