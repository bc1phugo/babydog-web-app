"use client";

import { useTelegram } from "@/app/providers/telegram-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import useUserInfoQuery from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function FriendsPage() {
  const { toast } = useToast();
  const { webApp } = useTelegram();
  const { data: userData } = useUserInfoQuery();
  const telegramUrl = process.env.NEXT_PUBLIC_URL;
  const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState<boolean>(false);
  const referalUrl = `${telegramUrl}?startapp=${
    userData?.user.referral_code ?? ""
  }`;

  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    referalUrl,
  )}&text=${encodeURIComponent("Join me on this platform!")}`;

  const onClickCopy = (text: string) => {
    window.navigator.clipboard.writeText(text);
    setIsInviteDrawerOpen(false);

    toast({
      title: "Referral link copied to clipboard",
    });
  };

  const onClickShare = () => {
    setIsInviteDrawerOpen(false);
    if (webApp) {
      webApp.openTelegramLink(shareUrl);
    } else {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/images/babydog-4.png" as="image" />
      </Head>
      <div className="mt-[30px] flex flex-col justify-between px-[23px] pb-[123px]">
        <section className="mb-[30px] flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <div className="font-semibold">
              <span className="block text-4xl tracking-tight">
                Invite friends
              </span>
              <span className="block text-2xl">and get more BABY DOG</span>
            </div>
            <Image
              priority
              src="/images/babydog-4.png"
              width={256}
              height={211}
              alt={"image-baby-dog"}
              className="m-auto mt-[20px]"
            />
          </div>
          <div className="mt-[15px] text-[24px] leading-7">
            Tap on the button to invite
            <br /> your friends
          </div>
        </section>
        <section className="flex gap-[15px]">
          <Drawer
            open={isInviteDrawerOpen}
            onOpenChange={setIsInviteDrawerOpen}
          >
            <DrawerTrigger asChild>
              <Button
                className={cn("w-full text-xl font-semibold leading-6")}
                variant="orange"
                size="xl"
                onClick={() => setIsInviteDrawerOpen(true)}
              >
                Invite friends
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-[#FFB061]">
              <DrawerHeader className="rounded-t-full bg-gradient-to-b from-customOrange to-customOrange-deep">
                <DrawerTitle className="text-center text-lg font-semibold text-background">
                  Invite friends
                </DrawerTitle>
              </DrawerHeader>
              <DrawerFooter className="gap-[15px] px-[23px] py-10">
                <Button
                  className={cn(
                    buttonVariants({ variant: "gray", size: "xl" }),
                    "rounded-full",
                    "text-lg",
                  )}
                  disabled={!userData || !telegramUrl}
                  onClick={() => onClickCopy(referalUrl)}
                >
                  Copy invite link
                </Button>
                <Button
                  onClick={onClickShare}
                  className={cn(
                    buttonVariants({ variant: "gray", size: "xl" }),
                    "rounded-full",
                    "text-lg",
                  )}
                >
                  Share invite link
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </section>
      </div>
    </>
  );
}
