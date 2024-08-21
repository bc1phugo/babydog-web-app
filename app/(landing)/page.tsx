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
import useUserInfoQuery, { ITargetMission } from "@/hooks/useUserInfo";
import useUserRankingsQuery from "@/hooks/useUserRankings";

export default function LandingPage() {
  const { user, webApp } = useTelegram();
  const [justRegistered, setJustRegistered] = useState(false);
  const searchParams = useSearchParams();
  const referralFromQuery = searchParams.get("startapp");

  const { data: userData, refetch: refetchUserInfo } = useUserInfoQuery();

  const { refetch: refetchUserRankings } = useUserRankingsQuery({
    customEnabled: !!userData?.userExist,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp) {
      WebApp.expand();
    }
  }, []);

  useEffect(() => {
    const createUser = async () => {
      if (!userData || userData.userExist) return;
      if (!user || (process.env.NEXT_PUBLIC_ENV !== "DEVELOPMENT" && !webApp))
        return;

      const referralFromApp = webApp?.initDataUnsafe.start_param;

      try {
        await fetch(`/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telegram_id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            language_code: user.language_code,
            is_premium: user.is_premium || false,
            photo_url: user.photo_url,
            referral_code:
              process.env.NODE_ENV === "development"
                ? referralFromQuery
                : referralFromApp,
          }),
        });
      } catch (err: any) {
        console.error("Unexpected error:", err);
      } finally {
        refetchUserInfo();
        refetchUserRankings();
      }
    };
    createUser();
  }, [
    referralFromQuery,
    refetchUserInfo,
    refetchUserRankings,
    user,
    userData,
    userData?.userExist,
    webApp,
  ]);

  useEffect(() => {
    if (!userData) return;

    const executeCompleteRewardMission = async (mission: ITargetMission) => {
      if (!userData) return;
      try {
        const response = await fetch(
          `/api/user/${userData.user.telegram_id}/mission`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mission_id: mission.id,
              telegram_id: userData.user.telegram_id,
            }),
          },
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        console.warn("Error Completing Reward Mission");
      }
    };
    const rewardMissions = userData.missions.filter(
      (mission) => mission.mission_type === "reward",
    );

    /**
     * TODO: creation Date 가지고 와서 계산하기
     * @description 죄송합니다. 여기 조금 더 로직 수정해야해요.
     * @author Hugo
     */

    const Year3ThreshHold = 1730650441;
    const Year7ThreshHold = 280650441;
    rewardMissions.forEach(async (rewardMission) => {
      if (!user) return;
      const telegramId = user.id;
      switch (rewardMission.mission_name) {
        case "Account age: 3 years or less": {
          if (Number(telegramId) > Year3ThreshHold) {
            await executeCompleteRewardMission(rewardMission);
            break;
          }
        }
        case "Account age: 4-6 years": {
          if (
            Number(telegramId) < Year3ThreshHold &&
            Number(telegramId) > Year7ThreshHold
          ) {
            await executeCompleteRewardMission(rewardMission);
            break;
          }
        }
        case "Account age: 7 years or more": {
          if (Number(telegramId) <= Year7ThreshHold) {
            await executeCompleteRewardMission(rewardMission);
            break;
          }
        }
      }

      // Telegram Id
      if (rewardMission.mission_name === "Telegram Premium") {
        if (user.is_premium) {
          await executeCompleteRewardMission(rewardMission);
        }
      }
    });
  }, [user, userData]);

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
          href={"/account-check"}
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
