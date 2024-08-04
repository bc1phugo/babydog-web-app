"use client";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    if (WebApp) {
      WebApp.expand();
    }
  }, []);
  return (
    <main className="flex flex-col min-h-svh justify-end gap-20 py-12 px-4">
      <section>
        <Skeleton className="w-full h-[200px] rounded-full" />
      </section>
      <section className="flex flex-col items-center justify-center">
        <div className="font-bold text-lg">{`👋 Hey!`}</div>
        <div className="text-muted-foreground mt-3">
          {`You've been in Telegram for a`}
          <br />
          {` while, it's time to get rewarded!`}
        </div>
      </section>
      <Link
        href={"/account-check"}
        className={buttonVariants({ variant: "blue" })}
      >
        {"Wow, let's go!"}
      </Link>
    </main>
  );
}
