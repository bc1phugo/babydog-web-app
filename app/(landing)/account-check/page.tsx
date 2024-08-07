"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CheckCircleIcon from "/public/icons/icon_check_circle.svg";
import { cn } from "@/lib/utils";

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
  const [linkDisabled, setLinkDisabled] = useState<boolean>(false);

  return (
    <main className="h-full overflow-auto overflow-x-hidden flex flex-col pt-[60px] px-[23px]">
      <section>
        <h1 className="text-4xl font-semibold">
          Checking <br />
          your account
        </h1>
      </section>
      <section className="text-lg leading-6 flex flex-col gap-10 mt-[60px]">
        <div>
          <div className="flex justify-between tracking-tight">
            Account Age Verified
            <CheckCircleIcon
              width={18}
              height={18}
              className={cn(
                linkDisabled
                  ? "text-muted-foreground"
                  : "fill-customOrange-deep",
                "transition-all duration-300"
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
                linkDisabled
                  ? "text-muted-foreground"
                  : "fill-customOrange-deep",
                "transition-all duration-300"
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
                linkDisabled
                  ? "text-muted-foreground"
                  : "fill-customOrange-deep",
                "transition-all duration-300"
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
                linkDisabled
                  ? "text-muted-foreground"
                  : "fill-customOrange-deep",
                "transition-all duration-300"
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
          "font-semibold text-xl leading-6 mt-[94px]"
        )}
        aria-disabled={linkDisabled}
      >
        Continue
      </Link>
    </main>
  );
}
