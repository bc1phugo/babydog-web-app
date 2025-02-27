"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
// import BabyDogMissionBoard from "./components/baby-dog-mission-board";
import { useTelegram } from "@/app/providers/telegram-provider";
import useUserInfoQuery from "@/hooks/useUserInfo";
import Head from "next/head";
import dynamic from "next/dynamic";

const BabyDogMissionBoard = dynamic(
  () => import("./components/baby-dog-mission-board"),
  {
    ssr: false,
  },
);

export default function MainPage() {
  const { data: userInfo } = useUserInfoQuery();
  const { webApp } = useTelegram();

  return (
    <>
      <Head>
        <link rel="preload" href="/images/babydog-3.webp" as="image" />
        <link rel="preload" href="/images/puppy-icon.webp" as="image" />
      </Head>

      <div className="mt-[25px] select-none px-[23px]">
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <Image
              priority
              src="/images/babydog-3.webp"
              width={190}
              height={191}
              alt={"image-baby-dog"}
              className="m-auto"
            />
            <div className="mt-[10px] flex flex-wrap justify-center text-4xl font-semibold">
              <span>{userInfo?.user.baby_dog_points ?? 0} BABY&nbsp;DOGS</span>
            </div>
          </div>
          <div className="mt-[30px]">
            <div className="flex justify-between gap-[30px]">
              <div>
                <div className="font-normal leading-[22px] tracking-tight text-muted-foreground">
                  Rewards
                </div>
                <div className={cn("flex items-center gap-[5px]")}>
                  <span className="text-center text-[18px] font-semibold leading-[22px] tracking-tight">
                    +{userInfo?.user.reward_points}
                  </span>
                  <Image
                    priority
                    src="/images/puppy-icon.webp"
                    alt="puppy-icon-image"
                    width={25}
                    height={17}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="font-normal leading-[22px] tracking-tight text-muted-foreground">
                    Task
                  </div>
                  <div className={cn("flex items-center gap-[5px]")}>
                    <span className="text-center text-[18px] font-semibold leading-[22px] tracking-tight">
                      +{userInfo?.user.task_points}
                    </span>
                    <Image
                      priority
                      src="/images/puppy-icon.webp"
                      alt="puppy-icon-image"
                      width={25}
                      height={17}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="font-normal leading-[22px] tracking-tight text-muted-foreground">
                  Invites
                </div>
                <div className={cn("flex items-center gap-[5px]")}>
                  <span className="text-center text-[18px] font-semibold leading-[22px] tracking-tight">
                    +{userInfo?.user.invite_points}
                  </span>
                  <Image
                    priority
                    src="/images/puppy-icon.webp"
                    alt="puppy-icon-image"
                    width={25}
                    height={17}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-12 flex flex-col gap-[15px]">
          <Button
            className={cn(
              buttonVariants({ variant: "orange", size: "xl" }),
              "w-full text-xl font-semibold leading-6",
            )}
            onClick={() => {
              const url = "https://t.me/babydogrunescommunity";
              if (webApp) {
                webApp.openTelegramLink(url);
              } else {
                window.open(url, "_blank");
              }
            }}
          >
            Join Baby dog channel
          </Button>
          <Button
            onClick={() => {
              const url = "https://x.com/BabydogrRunes";
              if (webApp) {
                webApp.openLink(url);
              } else {
                window.open(url, "_blank");
              }
            }}
            className={cn(
              buttonVariants({ variant: "gray", size: "xl" }),
              "w-full text-xl leading-6",
            )}
          >
            Follow Baby dog X.COM
          </Button>
        </section>
      </div>
      {userInfo && <BabyDogMissionBoard userInfo={userInfo} />}
    </>
  );
}
