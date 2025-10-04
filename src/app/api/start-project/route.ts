import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { ZodError } from "zod";
import { startProjectApiSchema, type StartProjectApiPayload } from "@/lib/validation";

export const runtime = "nodejs";

const CLIENT_REQUESTS_TABLE = "clients requests data";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = startProjectApiSchema.parse(json);

    const supabase = createSupabaseClient();
    const { error: insertError } = await supabase.from(CLIENT_REQUESTS_TABLE).insert({
      "full name": payload.name,
      email: payload.email,
      "company or team": payload.company,
      "focus area": payload.services.join(", "),
      "budget range": payload.budget,
      paragraph: payload.description,
      hear: payload.hear ?? null,
      phone: payload.phone ?? null,
      nationality: payload.nationality ?? null,
      created_at: new Date().toISOString()
    });

    if (insertError) {
      throw new Error(`Supabase insert failed: ${insertError.message}`);
    }

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

function buildSummary(payload: StartProjectApiPayload) {
  const services = payload.services.join(", ");
  const projectReport = payload.projectReport
    ? `${payload.projectReport.name} (${formatFileSize(payload.projectReport.size)})${payload.projectReport.url ? ` — ${payload.projectReport.url}` : ""}`
    : "Not provided";

  return `New project inquiry from ${payload.name} (${payload.company})\nEmail: ${payload.email}\nTimeline: ${payload.timeline}\nServices: ${services}\nBudget: ${payload.budget}\nHow they heard: ${payload.hear ?? "n/a"}\nPhone: ${payload.phone ?? "n/a"}\nNationality: ${payload.nationality ?? "n/a"}\nSlack channel: ${payload.slackChannel ?? "n/a"}\nInvite us to Slack: ${payload.slackInvite ? "Yes" : "No"}\nProject report: ${projectReport}`;
}

async function sendEmail(payload: StartProjectApiPayload, summary: string) {
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

  await transporter.sendMail({
    from,
    to,
    subject: "New project inquiry",
    text: `${summary}\n\nProject details:\n${payload.description}`,
    html: `<pre style="font-family: ui-monospace, SFMono-Regular, SFMono, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space: pre-wrap;">${summary}\n\nProject details:\n${payload.description}</pre>`
  });

  return true;
}

async function postToSlack(payload: StartProjectApiPayload, summary: string) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    return false;
  }

  const projectReportLine = payload.projectReport?.url
    ? `*Project report*: ${payload.projectReport.url}`
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
