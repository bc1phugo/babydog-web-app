import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { telegramId: string } }
) {
  const res = await request.json();
  const { telegramId } = params;
  try {
    const response = await fetch(`${process.env.API_URL}/api/mission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
      // cache: "no-cache",
    });
    const data = await response.json();

    // Check if the backend returned an error in the data
    if (data.error) {
      throw new Error(data.error);
    }
    revalidateTag(`userInfo-${telegramId}`);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "unknown error occured" },
      { status: 500 }
    );
  }
}
