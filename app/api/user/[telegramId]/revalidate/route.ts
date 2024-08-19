import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { telegramId: string } }
) {
  const { telegramId } = params;
  try {
    revalidatePath(`/api/user/${telegramId}`);
    return NextResponse.json("Revalidate DONE!", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
