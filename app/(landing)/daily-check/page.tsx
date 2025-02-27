"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTelegram } from "@/app/providers/telegram-provider";
import useUserInfoQuery from "@/hooks/useUserInfo";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function DailyCheckPage() {
  const { data: userInfo } = useUserInfoQuery();

  return (
    <main className="flex h-full flex-col justify-between overflow-auto overflow-x-hidden px-[23px] pb-[30px] pt-[25px]">
      <section className="flex flex-col items-center text-center">
        <p className="text-md tracking-tight text-muted-foreground">
          Daily attendance 🐶
        </p>
        {userInfo ? (
          <h1 className="mt-2 text-5xl font-semibold">
            {userInfo.user.checkin_days_count} Days
          </h1>
        ) : (
          <Skeleton className={cn("mt-2 h-12 w-32 font-semibold")} />
        )}

        <p className="mt-1 text-md tracking-tight text-muted-foreground">
          Congratulations!
          <br />
          Keep earning your daily rewards.
        </p>
      </section>
      <section className="flex flex-col items-center gap-2 text-lg leading-6">
        <Image
          priority
          src="/images/image_babydog_birthday.webp"
          width={315}
          height={288}
          alt={"image-baby-dog-birthday"}
        />
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold">+ 500</span>
          <span className="text-lg">BABY DOG</span>
        </div>
      </section>

      <Link
        href={"/main"}
        className={cn(
          buttonVariants({ variant: "orange", size: "xl" }),
          "mt-[15px] text-xl font-semibold leading-6",
        )}
      >
        Continue
      </Link>
    </main>
  );
}
