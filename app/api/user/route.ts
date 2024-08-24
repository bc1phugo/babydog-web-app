import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

interface ICreateUserReturn {
  message: string;
  newTelegramId: string;
  inviterTelegramId: string | null;
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
    });
    const data: ICreateUserReturn = await response.json();

    // 유저 생성하고, 다시 userInfo를 불러와야 하므로 revalidate
    revalidateTag(`userInfo-${telegramId}`);
    revalidateTag(`userRankings-${telegramId}`);
    console.log(`userInfo-${telegramId} Revalidated after user created`);

    // 레퍼럴로 가입했으면, 레퍼럴한 유저의 포인트도 다시 불러와야하므로 revalidate
    if (data.inviterTelegramId !== "" && data.inviterTelegramId) {
      revalidateTag(`userInfo-${data.inviterTelegramId}`);
      console.log(
        `userInfo-${data.inviterTelegramId} Revalidated after invited user created`,
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
