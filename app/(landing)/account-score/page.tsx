"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Phase1 from "./components/phase1";
import Phase2 from "./components/phase2";
import { useTelegram } from "@/app/providers/telegram-provider";
import useUserInfoQuery from "@/hooks/useUserInfo";
import ParticlesBackground from "@/components/ui/particles-background";

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
  const [currentPhase, setCurrentPhase] = useState<0 | 1 | 2>(0);
  const isLastPhase = currentPhase === 2;

  const { user } = useTelegram();
  const { data: userInfo } = useUserInfoQuery();

  useEffect(() => {
    setTimeout(() => {
      setCurrentPhase(1);
    }, 100);
  }, []);

  return (
    <main className="flex h-full flex-col justify-between overflow-auto overflow-x-hidden px-[23px] pb-[30px] pt-[20px]">
      <section>
        <div className="flex gap-2">
          <Progress
            className="h-[5px]"
            value={currentPhase >= 1 ? 100 : 0}
            onClick={() => setCurrentPhase(1)}
          />
          <Progress className="h-[5px]" value={currentPhase >= 2 ? 100 : 0} />
        </div>
        <div className="relative h-full w-full flex-1 text-center">
          {/* <ParticlesBackground /> */}
          {currentPhase === 1 || currentPhase === 0 ? (
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
            "text-xl font-semibold leading-6",
          )}
        >
          Continue
        </Link>
      ) : (
        <Button
          variant="orange"
          size="xl"
          className={cn("text-xl font-semibold leading-6")}
          onClick={() => setCurrentPhase((prev) => (prev + 1) as 1 | 2)}
        >
          Continue
        </Button>
      )}
    </main>
  );
}
