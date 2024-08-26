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
import useUserInfoQuery, { IDBUser, ITargetMission } from "@/hooks/useUserInfo";
import useUserRankingsQuery from "@/hooks/useUserRankings";

export default function LandingPage() {
  const { user, webApp } = useTelegram();
  const [justUserCreated, setJustUserCreated] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const referralFromQuery = searchParams.get("startapp");
  const { data: userInfo, refetch: refetchUserInfo } = useUserInfoQuery();

  const { refetch: refetchUserRankings } = useUserRankingsQuery({
    customEnabled: userInfo && userInfo.userExist,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp) {
      WebApp.expand();
    }
  }, []);

  useEffect(() => {
    const createUser = async () => {
      if (!userInfo || userInfo.error || userInfo.userExist) return;
      if (!user || (process.env.NEXT_PUBLIC_ENV !== "DEVELOPMENT" && !webApp))
        return;

      const referralFromApp = webApp?.initDataUnsafe.start_param;
      const referral_code =
        process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT"
          ? referralFromQuery
          : referralFromApp;

      try {
        setJustUserCreated(true);
        const response = await fetch(`/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-telegram-data": webApp?.initData ?? "",
          },
          body: JSON.stringify({
            telegram_id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            language_code: user.language_code,
            is_premium: user.is_premium || false,
            photo_url: user.photo_url,
            referral_code: referral_code,
          }),
        });

        const data = await response.json();

        if (data.error) {
          throw Error(data.error);
        }

        refetchUserInfo();
        refetchUserRankings();
      } catch (err: any) {
        console.error("Unexpected error:", err);
      } finally {
      }
    };
    createUser();
  }, [
    referralFromQuery,
    refetchUserInfo,
    refetchUserRankings,
    user,
    userInfo,
    userInfo?.userExist,
    webApp,
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
          aria-disabled={!userInfo}
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
