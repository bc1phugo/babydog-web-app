"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    if (WebApp) {
      WebApp.expand();
    }
  }, []);

  return (
    <main className="flex flex-col justify-end min-h-svh pt-[80px] pb-[90px] px-[23px]">
      <section className="flex justify-center">
        <Image
          src="/images/babydog-1.png"
          width={218}
          height={316}
          alt={"image-baby-dog"}
        />
      </section>
      <section className="flex flex-col text-primary text-lg leading-7 items-center justify-center text-center font-bold mt-[54px] mb-[60px]">
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
          buttonVariants({ variant: "orange" }),
          "font-semibold h-[60px] text-xl leading-6"
        )}
      >
        {"Wow, let's go!"}
      </Link>
    </main>
  );
}
