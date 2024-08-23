import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as crypto from "crypto";

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
  const secretKey = new TextEncoder().encode(TELEGRAM_BOT_TOKEN);

  const [hashString, ...params] = initData.split("&").sort();
  const dataString = params.join("\n");

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
    new TextEncoder().encode(dataString),
  );

  const hashHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log("🚀 ~ hashHex:", hashHex);

  return hashString === hashHex;
};
