import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { HmacSHA256, enc } from "crypto-js";

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
  const secret = HmacSHA256(TELEGRAM_BOT_TOKEN, "WebAppData");
  const _hash = HmacSHA256(dataToCheck.join("\n"), secret).toString(enc.Hex);

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
