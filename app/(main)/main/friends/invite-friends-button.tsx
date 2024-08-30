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
import React, { useState } from "react";

export default function InviteFriendsButton() {
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
    <Drawer open={isInviteDrawerOpen} onOpenChange={setIsInviteDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          className={cn("w-full select-none text-xl font-semibold leading-6")}
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
  );
}
