import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // https://core.telegram.org/bots#creating-a-new-bot

/**
 * @description To Check user has come for sure via Telegram Web App
 * Make sure, that no malicious call has come, such as DDos-like attck through other server. etc...
 */
export const verifyTelegramInitData = async (
  initData: string,
): Promise<boolean> => {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set in environment variables.");
  }

  const secretKey = new TextEncoder().encode(TELEGRAM_BOT_TOKEN);

  // Extract hash from the initData and decode the rest
  const params = initData.split("&").map((param) => {
    const [key, value] = param.split("=");
    return { key, value: decodeURIComponent(value) };
  });

  const hashParam = params.find((p) => p.key === "hash");
  if (!hashParam) {
    throw new Error("Hash not found in initData");
  }
  const hashString = hashParam.value;

  const dataParams = params
    .filter((p) => p.key !== "hash")
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((p) => `${p.key}=${p.value}`)
    .join("\n");

  console.log("🚀 ~ dataParams:", dataParams);

  const key = await crypto.subtle.importKey(
    "raw",
    secretKey,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(dataParams),
  );

  const hashHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log("🚀 ~ hashHex:", hashHex);
  console.log("🚀 ~ Expected hash:", hashString);

  return hashString === hashHex;
};
