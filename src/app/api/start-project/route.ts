import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ZodError } from "zod";
import { startProjectSchema, type StartProjectPayload } from "@/lib/validation";

export const runtime = "nodejs";

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

    const summary = buildSummary(payload);
    const emailSent = await sendEmail(payload, summary);
    const slackPosted = await postToSlack(payload, summary);

    return NextResponse.json({ ok: true, emailSent, slackPosted });
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

function buildSummary(payload: StartProjectPayload) {
  const services = payload.services.join(", ");
  const projectReport = payload.projectReport
    ? `${payload.projectReport.name} (${formatFileSize(payload.projectReport.size)})`
    : "Not provided";

  return `New project inquiry from ${payload.name} (${payload.company})\nEmail: ${payload.email}\nTimeline: ${payload.timeline}\nServices: ${services}\nBudget: ${payload.budget}\nHow they heard: ${payload.hear ?? "n/a"}\nSlack channel: ${payload.slackChannel ?? "n/a"}\nInvite us to Slack: ${payload.slackInvite ? "Yes" : "No"}\nProject report: ${projectReport}`;
}

async function sendEmail(payload: StartProjectPayload, summary: string) {
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
    payload.projectReport && payload.projectReport.size > 0
      ? [
          {
            filename: payload.projectReport.name,
            content: Buffer.from(await payload.projectReport.arrayBuffer()),
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

async function postToSlack(payload: StartProjectPayload, summary: string) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    return false;
  }

  const projectReportLine = payload.projectReport
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
