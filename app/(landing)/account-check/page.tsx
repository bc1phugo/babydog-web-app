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
    <main className="h-full overflow-auto pb-[30px] overflow-x-hidden flex flex-col pt-[60px] px-[23px] justify-between">
      <section>
        <h1 className="text-4xl font-semibold">
          Checking <br />
          your account
        </h1>
      </section>
      <section className="text-lg leading-6 flex flex-col gap-10 mt-[10px]">
        <div>
          <div className="flex justify-between tracking-tight">
            Account Age Verified
            <CheckCircleIcon
              width={18}
              height={18}
              className={cn(
                accountAgeChecked
                  ? "fill-customOrange-deep"
                  : "text-muted-foreground",
                "transition-all duration-300 delay-3000"
              )}
            />
          </div>
          <Progress
            className={cn("h-2 mt-[10px]")}
            value={accountAgeChecked ? 100 : 0}
          />
        </div>
        <div>
          <div className="flex justify-between tracking-tight">
            Acitivy Level Analyzed{" "}
            <CheckCircleIcon
              width={18}
              height={18}
              className={cn(
                activityLevelChecked
                  ? "fill-customOrange-deep"
                  : "text-muted-foreground",
                "transition-all duration-300 delay-3000"
              )}
            />
          </div>
          <Progress
            className={cn("h-2 mt-[10px]")}
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
                "transition-all duration-300 delay-3000"
              )}
            />
          </div>
          <Progress
            className={cn("h-2 mt-[10px]")}
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
                "transition-all duration-300 delay-3000"
              )}
            />
          </div>
          <Progress
            className={cn("h-2 mt-[10px]")}
            defaultValue={0}
            value={ogStatusChecked ? 100 : 0}
          />
        </div>
      </section>

      <Link
        href={"/account-score"}
        className={cn(
          buttonVariants({ variant: "orange", size: "xl" }),
          "font-semibold text-xl leading-6 mt-[34px]"
        )}
        aria-disabled={linkDisabled}
      >
        Continue
      </Link>
    </main>
  );
}
