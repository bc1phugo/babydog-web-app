import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to generate HMAC-SHA256 using Web Crypto API
async function HMAC_SHA256(
  value: string,
  key: CryptoKey,
): Promise<ArrayBuffer> {
  const enc = new TextEncoder().encode(value);
  const signature = await crypto.subtle.sign("HMAC", key, enc);
  console.log("🚀 ~ HMAC_SHA256 signature ArrayBuffer:", signature); // Log the raw ArrayBuffer
  return signature;
}
// Function to convert ArrayBuffer to hex string
function hex(buffer: ArrayBuffer) {
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
  // Parse query data
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  console.log("🚀 ~ TELEGRAM_BOT_TOKEN:", TELEGRAM_BOT_TOKEN);
  const parsedData = Object.fromEntries(
    new URLSearchParams(initData).entries(),
  );

  // Get Telegram hash
  const hash = parsedData.hash;
  if (!hash) {
    throw new Error("Hash not found in initData");
  }

  // Remove 'hash' value & Sort alphabetically
  const data_keys = Object.keys(parsedData)
    .filter((v) => v !== "hash")
    .sort();
  console.log("🚀 ~ data_keys:", data_keys);

  // Create line format key=<value>
  const items = data_keys.map((key) => `${key}=${parsedData[key]}`);

  console.log("🚀 ~ items:", items);
  // Create check string with a line feed character ('\n', 0x0A) used as separator
  const data_check_string = items.join("\n");
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

  const secretKeyBuffer = await HMAC_SHA256("WebAppData", botTokenKey);
  console.log("🚀 ~ secretKeyBuffer:", secretKeyBuffer);
  const secretKey = await crypto.subtle.importKey(
    "raw",
    secretKeyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  console.log("🚀 ~ secretKey:", secretKey);

  // Step 2: Generate hash to validate using the secret key and data_check_string
  const hashGeneratedBuffer = await HMAC_SHA256(data_check_string, secretKey);
  console.log("🚀 ~ hashGeneratedBuffer:", hashGeneratedBuffer);
  const hashGenerate = hex(hashGeneratedBuffer);

  console.log("🚀 ~ Generated hash:", hashGenerate);
  console.log("🚀 ~ Telegram hash:", hash);

  // Step 3: Return whether the generated hash matches the provided hash
  return hashGenerate === hash;
};
