import OpenAI from "openai";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type GenerateStreamArgs = {
  systemPrompt: string;
  messages: ChatMessage[];
  siteContext: Record<string, unknown>;
};

const API_KEY = process.env.gpt5nano_api_key;

if (!API_KEY) {
  throw new Error(
    "Missing environment variable gpt5nano_api_key. Set it before starting the server."
  );
}

const MODEL = process.env.MODEL ?? "gpt-5-nano";

const client = new OpenAI({
  apiKey: API_KEY,
});

export async function generateAssistantStream({
  systemPrompt,
  messages,
  siteContext,
}: GenerateStreamArgs) {
  const input: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    {
      role: "system",
      content: `site_context:\n${JSON.stringify(siteContext).slice(0, 4000)}`,
    },
    ...messages,
  ];

  const stream = await client.responses.stream({
    model: MODEL,
    temperature: 0.6,
    input,
  });

  return stream;
}
