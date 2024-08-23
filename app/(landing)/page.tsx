"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WebApp from "@twa-dev/sdk";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTelegram } from "../providers/telegram-provider";
import { useSearchParams } from "next/navigation";
import useUserInfoQuery from "@/hooks/useUserInfo";
import useCreateUser from "@/hooks/useCreateUser";
import useUserRankingsQuery from "@/hooks/useUserRankings";

export default function LandingPage() {
  const { user, webApp } = useTelegram();
  const [justUserCreated, setJustUserCreated] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const referralFromQuery = searchParams.get("startapp");
  const createUser = useCreateUser({
    onSuccess: () => setJustUserCreated(true),
  });
  const { data: userData } = useUserInfoQuery();
  useUserRankingsQuery({ customEnabled: userData && userData.userExist });

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp) {
      WebApp.expand();
    }
  }, []);

  useEffect(() => {
    if (!userData || userData.userExist) return;
    if (!user || (process.env.NEXT_PUBLIC_ENV !== "DEVELOPMENT" && !webApp))
      return;

    const referralFromApp = webApp?.initDataUnsafe.start_param;
    const referral_code =
      process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT"
        ? referralFromQuery
        : referralFromApp;

    createUser.mutate({
      ...user,
      referral_code: referral_code,
    });
  }, [
    referralFromQuery,
    user,
    userData,
    userData?.userExist,
    webApp,
    createUser,
  ]);

  return (
    <>
      <Head>
        <link rel="preload" href="/images/babydog-3.png" as="image" />
        <link
          rel="preload"
          href="/images/image_background_landing.png"
          as="image"
        />
      </Head>
      <main
        className={cn(
          "flex h-full flex-col overflow-auto overflow-x-hidden px-[23px] pb-[30px] pt-[40px] before:absolute before:inset-0 before:z-[-1] before:bg-landing before:bg-center",
          "justify-between",
        )}
      >
        <section className="flex justify-center">
          <Image
            priority
            src="/images/babydog-3.png"
            width={250}
            height={297}
            alt={"image-baby-dog"}
          />
        </section>
        <section className="mb-[60px] mt-[27px] flex flex-col items-center justify-center text-center text-[18px] leading-7 text-primary">
          <div>{`👋 Hey!`}</div>
          <div>
            {`You've been in Telegram for a while,`}
            <br />
            {`it's time to get rewarded!`}
          </div>
        </section>
        <Link
          href={justUserCreated ? "/account-check" : "/main"}
          className={cn(
            buttonVariants({ variant: "orange", size: "xl" }),
            "h-[60px] text-xl font-semibold leading-6",
          )}
        >
          {"Wow, let's go!"}
        </Link>
      </main>
    </>
  );
}
