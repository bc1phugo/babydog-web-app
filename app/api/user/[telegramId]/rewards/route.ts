import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { telegramId: string } }
) {
  const { telegramId } = params;

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/user/${telegramId}/rewards`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["userRewards", telegramId],
          revalidate: 60,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
