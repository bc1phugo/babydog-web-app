import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { telegramId: string } }
) {
  const { telegramId } = params;
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/user/${telegramId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: [`userInfo-${telegramId}`],
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const telegramId = body.telegram_id;

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

    revalidateTag(`userInfo-${telegramId}`);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
