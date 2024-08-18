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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FriendsPage() {
  const { toast } = useToast();
  const { data: userData } = useUserInfoQuery();
  const telegramUrl = process.env.NEXT_PUBLIC_URL;
  const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState<boolean>(false);

  const onClickCopy = (text: string) => {
    window.navigator.clipboard.writeText(text);

    setIsInviteDrawerOpen(false);
    toast({
      title: "Referral link copied to clipboard",
    });

    // if (webApp) {
    //   webApp.showAlert("Referral code copied to clipboard!");
    // } else {
    //   alert("Referral code copied to clipboard!");
    // }
  };

  return (
    <>
      <div className="mt-[60px] px-[23px] pb-[140px]">
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <div className="font-semibold ">
              <span className="block text-4xl tracking-tight">
                Invite friends
              </span>
              <span className="block text-3xl">and get more BABY DOG</span>
            </div>
            <Image
              priority
              src="/images/babydog-4.png"
              width={259}
              height={211}
              alt={"image-baby-dog"}
              className="m-auto mt-[52px]"
            />
          </div>
          <div className="mt-[57px] text-[24px] leading-7">
            Tap on the button to invite
            <br /> your friends
          </div>
        </section>
        <section className="mt-[60px] flex flex-col gap-[15px]">
          <Drawer
            open={isInviteDrawerOpen}
            onOpenChange={setIsInviteDrawerOpen}
          >
            <DrawerTrigger asChild>
              <Button
                className={cn("font-semibold text-xl leading-6 w-full")}
                variant="orange"
                size="xl"
                onClick={() => setIsInviteDrawerOpen(true)}
              >
                Invite friends
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-[#FFB061]">
              <DrawerHeader className="bg-gradient-to-b from-customOrange to-customOrange-deep rounded-t-full">
                <DrawerTitle className="text-lg text-background font-semibold text-center">
                  Invite friends
                </DrawerTitle>
              </DrawerHeader>
              <DrawerFooter className="gap-[15px] py-10 px-[23px]">
                <Button
                  className={cn(
                    buttonVariants({ variant: "gray", size: "xl" }),
                    "rounded-full",
                    "text-lg"
                  )}
                  disabled={!userData || !telegramUrl}
                  onClick={() =>
                    onClickCopy(
                      `${telegramUrl}?ref=${userData?.user.referral_code ?? ""}`
                    )
                  }
                >
                  Copy invite link
                </Button>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "gray", size: "xl" }),
                    "rounded-full",
                    "text-lg"
                  )}
                >
                  Share invite link
                </Link>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </section>
      </div>
    </>
  );
}
