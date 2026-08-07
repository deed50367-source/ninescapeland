// Shared AI provider resolver.
// Lets the three AI functions run on your own OpenAI / DeepSeek key,
// with the managed Lovable gateway as fallback when no own key is set.
//
// Env vars (Secrets):
//   AI_PROVIDER        optional: "openai" | "deepseek" | "lovable" (auto-detected when unset)
//   OPENAI_API_KEY     your OpenAI key (sk-...)
//   DEEPSEEK_API_KEY   your DeepSeek key (sk-...)
//   AI_BASE_URL        optional: override the chat-completions base URL (e.g. Azure / proxy)
//   AI_CHAT_MODEL      optional: model used by the live-chat assistant
//   AI_TRANSLATE_MODEL optional: model used by translation functions

export type AiTask = "chat" | "translate";

export interface AiProvider {
  name: string;
  url: string;
  apiKey: string;
  model: string;
}

const OPENAI_BASE = "https://api.openai.com/v1";
const DEEPSEEK_BASE = "https://api.deepseek.com/v1";
const LOVABLE_BASE = "https://ai.gateway.lovable.dev/v1";

const DEFAULT_MODELS: Record<string, Record<AiTask, string>> = {
  openai: { chat: "gpt-4o-mini", translate: "gpt-4o-mini" },
  deepseek: { chat: "deepseek-chat", translate: "deepseek-chat" },
  lovable: {
    chat: "google/gemini-3-flash-preview",
    translate: "google/gemini-2.5-flash-lite",
  },
};

function env(name: string): string | undefined {
  const value = Deno.env.get(name);
  return value && value.trim() ? value.trim() : undefined;
}

export function resolveAiProvider(task: AiTask): AiProvider {
  const openaiKey = env("OPENAI_API_KEY");
  const deepseekKey = env("DEEPSEEK_API_KEY");
  const lovableKey = env("LOVABLE_API_KEY");

  const requested = env("AI_PROVIDER")?.toLowerCase();
  const name =
    requested ??
    (openaiKey ? "openai" : deepseekKey ? "deepseek" : "lovable");

  const apiKey =
    name === "openai" ? openaiKey : name === "deepseek" ? deepseekKey : lovableKey;

  if (!apiKey) {
    throw new Error(
      `AI provider "${name}" selected but its API key is not configured. ` +
        `Set ${
          name === "openai"
            ? "OPENAI_API_KEY"
            : name === "deepseek"
            ? "DEEPSEEK_API_KEY"
            : "LOVABLE_API_KEY"
        }.`,
    );
  }

  const base =
    env("AI_BASE_URL") ??
    (name === "openai" ? OPENAI_BASE : name === "deepseek" ? DEEPSEEK_BASE : LOVABLE_BASE);

  const overrideModel = task === "chat" ? env("AI_CHAT_MODEL") : env("AI_TRANSLATE_MODEL");
  const model = overrideModel ?? (DEFAULT_MODELS[name] ?? DEFAULT_MODELS.lovable)[task];

  return {
    name,
    url: `${base.replace(/\/+$/, "")}/chat/completions`,
    apiKey,
    model,
  };
}
