"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BabyDogPointDetail from "./components/baby-dog-point-detail";
import { useTelegram } from "@/app/providers/telegram-provider";
import useUserInfoQuery from "@/hooks/useUserInfo";

export default function MainPage() {
  const { data: userInfo } = useUserInfoQuery();
  const { webApp } = useTelegram();

  return (
    <>
      <div className="mt-[67px] px-[23px]">
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <Image
              priority
              src="/images/babydog-4.png"
              width={190}
              height={154}
              alt={"image-baby-dog"}
              className="m-auto"
            />
            <div className="font-semibold text-4xl mt-[10px]">
              {userInfo?.user.baby_dog_points ?? 0} BABY DOGS
            </div>
          </div>
          <div className="mt-[30px]">
            <div className="flex justify-between gap-[30px]">
              <div>
                <div className="text-muted-foreground leading-[22px] font-normal tracking-tight">
                  Rewards
                </div>
                <div className={cn("flex gap-[5px]")}>
                  <span className="text-center text-[18px] leading-[22px] font-semibold tracking-tight">
                    + 600
                  </span>
                  <Image
                    priority
                    src="/images/three-puppies.svg"
                    alt="three-puppies-image"
                    width={36}
                    height={17}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="text-muted-foreground leading-[22px] font-normal tracking-tight">
                    Task
                  </div>
                  <div className={cn("flex gap-[5px]")}>
                    <span className="text-center text-[18px] leading-[22px] font-semibold tracking-tight">
                      + 0
                    </span>
                    <Image
                      priority
                      src="/images/three-puppies.svg"
                      alt="three-puppies-image"
                      width={36}
                      height={17}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground leading-[22px] font-normal tracking-tight">
                  Invites
                </div>
                <div className={cn("flex gap-[5px]")}>
                  <span className="text-center text-[18px] leading-[22px] font-semibold tracking-tight">
                    + 0
                  </span>
                  <Image
                    priority
                    src="/images/three-puppies.svg"
                    alt="three-puppies-image"
                    width={36}
                    height={17}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-20 flex flex-col gap-[15px]">
          <Button
            className={cn(
              buttonVariants({ variant: "orange", size: "xl" }),
              "font-semibold text-xl leading-6 w-full"
            )}
            onClick={() => {
              const url = "https://x.com";
              if (webApp) {
                webApp.openLink(url);
              } else {
                window.open(url, "_blank");
              }
            }}
          >
            Join Baby dog channel
          </Button>
          <Button
            onClick={() => {
              const url = "https://x.com";
              if (webApp) {
                webApp.openLink(url);
              } else {
                window.open(url, "_blank");
              }
            }}
            className={cn(
              buttonVariants({ variant: "gray", size: "xl" }),
              "text-xl leading-6 w-full"
            )}
          >
            Follow Baby dog X.COM
          </Button>
        </section>
      </div>
      {userInfo && <BabyDogPointDetail userInfo={userInfo} />}
    </>
  );
}
