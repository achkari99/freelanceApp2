import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ZodError } from "zod";
import { startProjectSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = startProjectSchema.parse(data);

    const summary = `New project inquiry from ${payload.name} (${payload.company})\nEmail: ${payload.email}\nTimeline: ${payload.timeline}\nServices: ${payload.services.join(", ")}\nBudget: ${payload.budget}\nHow they heard: ${payload.hear ?? "n/a"}\nSlack channel: ${payload.slackChannel ?? "n/a"}\nInvite us to Slack: ${payload.slackInvite ? "Yes" : "No"}`;

    const emailSent = await sendEmail(summary, payload.description);
    const slackPosted = await postToSlack(summary, payload.description);

    return NextResponse.json({ ok: true, emailSent, slackPosted });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ ok: false, issues: error.issues }, { status: 422 });
    }
    console.error("Start project submission failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function sendEmail(summary: string, description: string) {
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
    text: `${summary}\n\nProject details:\n${description}`,
    html: `<pre style="font-family: ui-monospace, SFMono-Regular, SFMono, Menlo, Monaco, Consolas, \'Liberation Mono\', \'Courier New\', monospace; white-space: pre-wrap;">${summary}\n\nProject details:\n${description}</pre>`
  });

  return true;
}

async function postToSlack(summary: string, description: string) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    return false;
  }

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
            text: `*Project description*\n${description}`
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

