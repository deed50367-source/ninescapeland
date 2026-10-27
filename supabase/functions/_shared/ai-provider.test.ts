import { afterEach, expect, test } from "bun:test";
import { resolveAiProvider } from "./ai-provider";

const originalDeno = Reflect.get(globalThis, "Deno");
afterEach(() => {
  if (originalDeno === undefined) Reflect.deleteProperty(globalThis, "Deno");
  else Reflect.set(globalThis, "Deno", originalDeno);
});
function setEnv(values: Record<string, string>) {
  Reflect.set(globalThis, "Deno", { env: { get: (key: string) => values[key] } });
}

test("customer-service chat uses configured SiliconFlow rather than Lovable", () => {
  setEnv({ SILICONFLOW_API_KEY: "test-only", AI_PROVIDER: "lovable" });
  const provider = resolveAiProvider("chat");
  expect(provider.name).toBe("siliconflow");
  expect(provider.url).toBe("https://api.siliconflow.cn/v1/chat/completions");
  expect(provider.model).toBe("deepseek-ai/DeepSeek-V3");
});

test("customer-service chat refuses fallback when no third-party key exists", () => {
  setEnv({ LOVABLE_API_KEY: "test-only" });
  expect(() => resolveAiProvider("chat")).toThrow("third-party provider");
});

test("customer-service chat rejects a managed gateway URL override", () => {
  setEnv({ SILICONFLOW_API_KEY: "test-only", AI_BASE_URL: "https://ai.gateway.lovable.dev/v1" });
  expect(() => resolveAiProvider("chat")).toThrow("Lovable AI endpoint");
});