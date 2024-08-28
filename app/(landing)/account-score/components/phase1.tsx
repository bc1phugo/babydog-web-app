"use client";

import { IUserInfo } from "@/hooks/useUserInfo";
import Image from "next/image";
interface Phase1Props {
  telegramId: number;
  userInfo: IUserInfo | undefined;
}

export default function Phase1({ telegramId, userInfo }: Phase1Props) {
  console.log("🚀 ~ Phase1 ~ userInfo:", userInfo);
  const luckyPointReward = userInfo?.rewards.filter((reward) =>
    reward.mission_name.includes("lucky"),
  )[0];
  const luckyPointEarned = luckyPointReward?.total_points;
  console.log("🚀 ~ Phase1 ~ luckyPointEarned:", luckyPointEarned);

  return (
    <>
      <h1 className="mt-[20px] text-4xl font-semibold">We are DOG Army!</h1>
      <Image
        priority
        src="/images/image_rocket.png"
        width={417}
        height={284}
        alt={"image-baby-dog"}
        className="absolute left-1/2 -z-10 m-auto min-h-[284px] min-w-[417px] -translate-x-1/2"
      />
      <div className="mt-[10px] text-md tracking-tight text-muted-foreground">
        You have joined Telegram
      </div>
      <div className="mb-[10px] mt-[20px]">
        <div className="text-[130px] font-semibold leading-[180px]">
          {luckyPointEarned}
        </div>
        <div className="mt-[10px] text-4xl font-semibold">Lucky Point</div>
        <div className="mt-[59px] text-base tracking-tight">
          Your account number is #{telegramId}. <br />
          {/* {"You're in the Top 90% Telegram users"} */}
        </div>
      </div>
    </>
  );
}
