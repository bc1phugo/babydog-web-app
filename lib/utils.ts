import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description To Check user has come for sure via Telegram Web App
 * Make sure, that no malicious call has come, such as DDos-like attck through other server. etc...
 */
export const verifyTelegramWebAppData = async (
  telegramInitData: string,
): Promise<boolean> => {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("Telegram bot token is missing.");
  }

  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get("hash");
  let dataToCheck: string[] = [];

  initData.sort();
  initData.forEach(
    (val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`),
  );

  // Generate HMAC key from the Telegram bot token using "WebAppData" as key
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode("WebAppData"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signatureKey = await crypto.subtle.sign(
    "HMAC",
    keyMaterial,
    new TextEncoder().encode(TELEGRAM_BOT_TOKEN),
  );

  // Convert the signature key to a format that can be used in the second HMAC operation
  const secretKey = await crypto.subtle.importKey(
    "raw",
    signatureKey,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  // Generate the hash of the data to check
  const signature = await crypto.subtle.sign(
    "HMAC",
    secretKey,
    new TextEncoder().encode(dataToCheck.join("\n")),
  );

  const _hash = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return _hash === hash;
};

export const formatNumber = (num: number): string => {
  if (num < 10000) {
    return num.toString();
  } else if (num >= 10000 && num < 1000000) {
    return (num / 1000).toFixed(2) + "K";
  } else {
    return (num / 1000000).toFixed(2) + "M";
  }
};
