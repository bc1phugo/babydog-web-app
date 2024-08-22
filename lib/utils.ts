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

export const verifyTelegramInitData = (initData: string): boolean => {
  const secretKey = process.env.TELEGRAM_BOT_TOKEN as string;

  const [hashString, ...params] = initData.split("&").sort();
  const dataString = params.join("\n");
  const secret = crypto
    .createHmac("sha256", secretKey)
    .update(dataString)
    .digest("hex");

  return hashString === secret;
};
