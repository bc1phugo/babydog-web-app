import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to generate HMAC-SHA256 using Web Crypto API
async function HMAC_SHA256(
  value: string | ArrayBuffer,
  key: CryptoKey,
): Promise<ArrayBuffer> {
  const enc =
    typeof value === "string" ? new TextEncoder().encode(value) : value;
  const signature = await crypto.subtle.sign("HMAC", key, enc);
  return signature;
}
// Function to convert ArrayBuffer to hex string
function hex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * @description To Check user has come for sure via Telegram Web App
 * Make sure, that no malicious call has come, such as DDos-like attck through other server. etc...
 */
export const verifyTelegramInitData = async (
  initData: string,
): Promise<boolean> => {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("Telegram bot token is missing.");
  }

  const parsedData = Object.fromEntries(
    new URLSearchParams(initData).entries(),
  );

  // Extract the hash from the parsed data
  const hash = parsedData.hash;
  console.log("🚀 ~ hash:", hash);
  if (!hash) {
    throw new Error("Hash not found in initData");
  }

  // Remove 'hash' from the parsed data and sort keys
  const data_keys = Object.keys(parsedData)
    .filter((v) => v !== "hash")
    .sort();
  console.log("🚀 ~ data_keys:", data_keys);

  // Create check string from the sorted data
  const data_check_string = data_keys
    .map((key) => `${key}=${parsedData[key]}`)
    .join("\n");
  console.log("🚀 ~ data_check_string:", data_check_string);

  // Step 1: Generate the secret key using "WebAppData" as the message and bot_token as the key
  const botTokenKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(TELEGRAM_BOT_TOKEN),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  console.log("🚀 ~ botTokenKey:", botTokenKey);

  // Step 2: Generate the hash with data_check_string and botTokenKey
  const hashBuffer = await HMAC_SHA256(data_check_string, botTokenKey);
  const generatedHash = hex(hashBuffer);
  console.log("🚀 ~ generatedHash:", generatedHash);

  // Step 3: Compare the generated hash with the provided hash
  return generatedHash === hash;
};
