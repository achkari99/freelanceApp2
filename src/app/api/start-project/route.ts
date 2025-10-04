import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Buffer } from "node:buffer";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { ZodError } from "zod";
import { startProjectSchema, type StartProjectPayload } from "@/lib/validation";

export const runtime = "nodejs";

const PROJECT_REPORT_BUCKET = "project reports";
const CLIENT_REQUESTS_TABLE = "clients requests data";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = startProjectSchema.parse({
      name: getString(formData, "name"),
      email: getString(formData, "email"),
      company: getString(formData, "company"),
      timeline: getString(formData, "timeline"),
      services: getStringArray(formData, "services"),
      budget: getString(formData, "budget"),
      description: getString(formData, "description"),
      projectReport: getFile(formData, "projectReport"),
      hear: getOptionalString(formData, "hear"),
      slackChannel: getOptionalString(formData, "slackChannel"),
      slackInvite: getBoolean(formData, "slackInvite", true)
    });

    const supabase = createSupabaseClient();

    let projectReportBuffer: Buffer | null = null;
    let projectReportPath: string | null = null;
    let projectReportUrl: string | null = null;

    if (payload.projectReport) {
      projectReportBuffer = Buffer.from(await payload.projectReport.arrayBuffer());
      const objectName = createStorageObjectName(payload.projectReport.name);
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from(PROJECT_REPORT_BUCKET)
        .upload(objectName, projectReportBuffer, {
          contentType: payload.projectReport.type || "application/octet-stream",
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Supabase storage upload failed: ${uploadError.message}`);
      }

      projectReportPath = uploadData?.path ?? objectName;
      const { data: publicUrlData } = supabase
        .storage
        .from(PROJECT_REPORT_BUCKET)
        .getPublicUrl(projectReportPath);
      projectReportUrl = publicUrlData?.publicUrl ?? null;
    }

    const { error: insertError } = await supabase.from(CLIENT_REQUESTS_TABLE).insert({
      "full name": payload.name,
      email: payload.email,
      "company or team": payload.company,
      "focus area": payload.services.join(", "),
      "budget range": payload.budget,
      paragraph: payload.description,
      hear: payload.hear,
      phone: payload.phone ?? null,
      nationality: payload.nationality ?? null,
      created_at: new Date().toISOString()
    });

    if (insertError) {
      throw new Error(`Supabase insert failed: ${insertError.message}`);
    }

    const summary = buildSummary(payload, { projectReportUrl });
    const emailSent = await sendEmail(payload, summary, projectReportBuffer);
    const slackPosted = await postToSlack(payload, summary, { projectReportUrl });

    return NextResponse.json({
      ok: true,
      emailSent,
      slackPosted,
      projectReportPath,
      projectReportUrl
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ ok: false, issues: error.issues }, { status: 422 });
    }
    console.error("Start project submission failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function getBoolean(formData: FormData, key: string, fallback: boolean) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return fallback;
  }
  return value === "true" || value === "on";
}

function getStringArray(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .flatMap((value) => (typeof value === "string" && value.trim().length > 0 ? [value] : []));
}

function getFile(formData: FormData, key: string) {
  const value = formData.get(key);
  if (value instanceof File && value.size > 0) {
    return value;
  }
  return null;
}

function buildSummary(payload: StartProjectPayload, options?: { projectReportUrl?: string | null }) {
  const services = payload.services.join(", ");
  const projectReport = options?.projectReportUrl
    ? `${payload.projectReport?.name ?? "Uploaded file"} (${options.projectReportUrl})`
    : payload.projectReport
    ? `${payload.projectReport.name} (${formatFileSize(payload.projectReport.size)})`
    : "Not provided";

  return `New project inquiry from ${payload.name} (${payload.company})\nEmail: ${payload.email}\nTimeline: ${payload.timeline}\nServices: ${services}\nBudget: ${payload.budget}\nHow they heard: ${payload.hear ?? "n/a"}\nPhone: ${payload.phone ?? "n/a"}\nNationality: ${payload.nationality ?? "n/a"}\nSlack channel: ${payload.slackChannel ?? "n/a"}\nInvite us to Slack: ${payload.slackInvite ? "Yes" : "No"}\nProject report: ${projectReport}`;
}

async function sendEmail(payload: StartProjectPayload, summary: string, projectReportBuffer: Buffer | null) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.START_PROJECT_EMAIL_FROM;
  const to = process.env.START_PROJECT_EMAIL_TO;

  if (!host || !port || !user || !pass || !from || !to) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  const attachments =
    projectReportBuffer && payload.projectReport
      ? [
          {
            filename: payload.projectReport.name,
            content: projectReportBuffer,
            contentType: payload.projectReport.type || undefined
          }
        ]
      : [];

  await transporter.sendMail({
    from,
    to,
    subject: "New project inquiry",
    text: `${summary}\n\nProject details:\n${payload.description}`,
    html: `<pre style="font-family: ui-monospace, SFMono-Regular, SFMono, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space: pre-wrap;">${summary}\n\nProject details:\n${payload.description}</pre>`,
    attachments: attachments.length ? attachments : undefined
  });

  return true;
}

async function postToSlack(payload: StartProjectPayload, summary: string, options?: { projectReportUrl?: string | null }) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    return false;
  }

  const projectReportLine = options?.projectReportUrl
    ? `*Project report*: ${options.projectReportUrl}`
    : payload.projectReport
    ? `*Project report*: ${payload.projectReport.name} (${formatFileSize(payload.projectReport.size)})`
    : "*Project report*: Not provided";

  try {
    const body = {
      text: "New project inquiry",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*New project inquiry*\n${summary}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Project description*\n${payload.description}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: projectReportLine
          }
        }
      ]
    };

    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error("Slack webhook failed", response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Slack webhook error", error);
    return false;
  }
}

function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase credentials are not configured");
  }

  return createClient(url, key, { auth: { persistSession: false } });
}

function createStorageObjectName(filename: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const random = randomUUID();
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `requests/${timestamp}-${random}-${safe}`;
}

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const megabytes = bytes / (1024 * 1024);
  if (megabytes >= 1) {
    return `${megabytes.toFixed(1)} MB`;
  }

  const kilobytes = bytes / 1024;
  if (kilobytes >= 1) {
    return `${Math.round(kilobytes)} KB`;
  }

  return `${bytes} B`;
}



