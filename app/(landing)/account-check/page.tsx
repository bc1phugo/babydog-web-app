"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CheckCircleIcon from "/public/icons/icon_check_circle.svg";
import { cn } from "@/lib/utils";
import WebApp from "@twa-dev/sdk";
import { useTelegram } from "@/app/providers/telegram-provider";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function AccountCheckPage() {
  const [accountAgeChecked, setAccountAgeChecked] = useState<boolean>(false);
  const [activityLevelChecked, setActivityLevelChecked] =
    useState<boolean>(false);
  const [isPremiumChecked, setIsPremiumChecked] = useState<boolean>(false);
  const [ogStatusChecked, setOgStatusChecked] = useState<boolean>(false);
  const isAllStatusChecked =
    accountAgeChecked &&
    activityLevelChecked &&
    isPremiumChecked &&
    ogStatusChecked;

  const { user } = useTelegram();
  const [linkDisabled, setLinkDisabled] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setAccountAgeChecked(true);
    }, 100);
    setTimeout(() => {
      setActivityLevelChecked(true);
    }, 150);
    setTimeout(() => {
      setIsPremiumChecked(true);
    }, 400);
    setTimeout(() => {
      setOgStatusChecked(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (isAllStatusChecked) {
      setTimeout(() => {
        setLinkDisabled(false);
      }, 3000);
    }
  }, [isAllStatusChecked]);

  return (
    <main className="flex h-full flex-col justify-between overflow-auto overflow-x-hidden px-[23px] pb-[30px] pt-[60px]">
      <section>
        <h1 className="text-4xl font-semibold">
          Checking <br />
          your account
        </h1>
      </section>
      <section className="mt-[10px] flex flex-col gap-10 text-lg leading-6">
        <div>
          <div className="flex justify-between tracking-tight">
            Lucky Points Awarded
            <CheckCircleIcon
              width={18}
              height={18}
              className={cn(
                accountAgeChecked
                  ? "fill-customOrange-deep"
                  : "text-muted-foreground",
                "transition-all delay-3000 duration-300",
              )}
            />
          </div>
          <Progress
            className={cn("mt-[10px] h-2")}
            value={accountAgeChecked ? 100 : 0}
          />
        </div>
        <div>
          <div className="flex justify-between tracking-tight">
            Activity Level Analyzed
            <CheckCircleIcon
              width={18}
              height={18}
              className={cn(
                activityLevelChecked
                  ? "fill-customOrange-deep"
                  : "text-muted-foreground",
                "transition-all delay-3000 duration-300",
              )}
            />
          </div>
          <Progress
            className={cn("mt-[10px] h-2")}
            defaultValue={0}
            value={activityLevelChecked ? 100 : 0}
          />
        </div>
        <div>
          <div className="flex justify-between tracking-tight">
            Telegram Premium Checked
            <CheckCircleIcon
              width={18}
              height={18}
              className={cn(
                isPremiumChecked
                  ? "fill-customOrange-deep"
                  : "text-muted-foreground",
                "transition-all delay-3000 duration-300",
              )}
            />
          </div>
          <Progress
            className={cn("mt-[10px] h-2")}
            defaultValue={0}
            value={isPremiumChecked ? 100 : 0}
          />
        </div>
        <div>
          <div className="flex justify-between tracking-tight">
            OG Status Confirmed
            <CheckCircleIcon
              width={18}
              height={18}
              className={cn(
                ogStatusChecked
                  ? "fill-customOrange-deep"
                  : "text-muted-foreground",
                "transition-all delay-3000 duration-300",
              )}
            />
          </div>
          <Progress
            className={cn("mt-[10px] h-2")}
            defaultValue={0}
            value={ogStatusChecked ? 100 : 0}
          />
        </div>
      </section>

      <Link
        href={"/account-score"}
        className={cn(
          buttonVariants({ variant: "orange", size: "xl" }),
          "mt-[34px] text-xl font-semibold leading-6",
        )}
        aria-disabled={linkDisabled}
      >
        Continue
      </Link>
    </main>
  );
}
