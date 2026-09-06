import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

export function getBedrockClient() {
  const region = process.env.AWS_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) return null;

  return new BedrockRuntimeClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function generateWithBedrock(
  systemPrompt: string,
  userPrompt: string,
  modelId: string = "anthropic.claude-3-5-sonnet-20241022-v2:0"
): Promise<string | null> {
  const client = getBedrockClient();
  if (!client) return null;

  try {
    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
    };

    const command = new InvokeModelCommand({
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const decoded = new TextDecoder().decode(response.body);
    const json = JSON.parse(decoded);
    return json.content?.[0]?.text || null;
  } catch (err: any) {
    console.warn("Amazon Bedrock invocation notice:", err.message);
    return null;
  }
}
