import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const telegramId = body.telegram_id;
  console.log("🚀 ~ POST ~ telegramId:", telegramId);

  try {
    const response = await fetch(`${process.env.API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      next: {
        revalidate: 60,
      },
    });
    const data = await response.json();
    console.log("🚀 ~ POST ~ data:", data);

    revalidateTag(`userInfo-${telegramId}`);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
