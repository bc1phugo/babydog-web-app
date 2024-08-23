import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTelegramInitData } from "./lib/utils";

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*"],
};

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();

  const initData = req.headers.get("x-telegram-data");
  console.log("🚀 ~ middleware ~ initData:", initData);

  if (!initData || initData === "") {
    return new NextResponse("Forbidden: Missing initData", { status: 403 });
  }

  const isVerified = await verifyTelegramInitData(initData);

  if (!isVerified) {
    return new NextResponse("Forbidden: Invalid initData", { status: 403 });
  }

  return NextResponse.next();
}
