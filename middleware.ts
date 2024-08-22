import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTelegramInitData } from "./lib/utils";

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*"],
};

export function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();

  const initData = req.headers.get("x-telegram-bot-api-secret-token");
  console.log("🚀 ~ middleware ~ initData:", initData);

  if (!initData) {
    return new NextResponse("Forbidden: Missing initData", { status: 403 });
  }

  const isVerified = verifyTelegramInitData(initData);

  if (!isVerified) {
    return new NextResponse("Forbidden: Invalid initData", { status: 403 });
  }

  return NextResponse.next();
}
