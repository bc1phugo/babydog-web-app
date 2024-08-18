"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Phase1 from "./components/phase1";
import Phase2 from "./components/phase2";
import { useTelegram } from "@/app/providers/telegram-provider";
import { useQuery } from "@tanstack/react-query";
import useUserInfoQuery from "@/hooks/useUserInfo";

export interface IDbUserData {
  id: number;
  telegram_id: string;
  baby_dog_points: number;
  created_at: Date;
  first_name: string;
  is_premium: false;
  language_code: string;
  last_name: string;
  photo_url: string | null;
  referral_code: string;
  username: string;
}

export default function AccountScorePage() {
  const testerUser =
    process.env.NODE_ENV === "development"
      ? {
          id: 123123,
          first_name: "Hugo",
          last_name: "oh",
          username: "Hugooh",
          language_code: "en",
          is_premium: true,
        }
      : null;

  const [currentPhase, setCurrentPhase] = useState<1 | 2>(1);
  const isLastPhase = currentPhase === 2;

  const { user } = useTelegram();
  const { data: userInfo } = useUserInfoQuery();

  return (
    <main className="h-full pt-[20px] pb-[20px] overflow-auto overflow-x-hidden flex flex-col px-[23px] justify-between">
      <section>
        <div className="flex gap-2">
          <Progress
            className="h-[5px]"
            value={currentPhase >= 1 ? 100 : 0}
            onClick={() => setCurrentPhase(1)}
          />
          <Progress className="h-[5px]" value={currentPhase >= 2 ? 100 : 0} />
        </div>
        <div className="text-center flex-1">
          {currentPhase === 1 ? (
            <Phase1 telegramId={user?.id ?? 0} />
          ) : (
            <Phase2 dogPoint={userInfo?.user.baby_dog_points ?? 0} />
          )}
        </div>
      </section>
      {isLastPhase ? (
        <Link
          href={"/main"}
          className={cn(
            buttonVariants({ variant: "orange", size: "xl" }),
            "font-semibold text-xl leading-6"
          )}
        >
          Continue
        </Link>
      ) : (
        <Button
          variant="orange"
          size="xl"
          className={cn("font-semibold text-xl leading-6")}
          onClick={() => setCurrentPhase((prev) => (prev + 1) as 1 | 2)}
        >
          Continue
        </Button>
      )}
    </main>
  );
}
