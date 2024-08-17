"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WebApp from "@twa-dev/sdk";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useTelegram } from "../providers/telegram-provider";
import { useSearchParams } from "next/navigation";

export default function LandingPage() {
  const { user } = useTelegram();
  const searchParams = useSearchParams();
  const referral = searchParams.get("startapp");

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp) {
      WebApp.expand();
    }
  }, []);

  useEffect(() => {
    alert(`${process.env.NEXT_PUBLIC_API_URL}/api/user`);
    try {
      fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          telegram_id: 11231231,
          username: "testuser",
          first_name: "Test",
          last_name: "User",
          language_code: "en",
          is_premium: false,
          photo_url: "http://example.com/photo.jpg",
          referral_code: null,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(
                `Server responded with status ${res.status}: ${text}`
              );
            });
          }
          return res.json(); // assuming your server returns JSON
        })
        .then((data) => {
          alert("User created successfully: " + JSON.stringify(data));
        })
        .catch((err) => {
          console.error("Error in fetch:", err);
          alert("Error: " + err.message);
        });
    } catch (err: any) {
      console.error("Unexpected error:", err);
      alert("Unexpected error: " + err.message);
    }
  }, [user, referral]);

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="../public/images/image_background_landing.png"
          as="image"
        />
      </Head>
      <main
        className={cn(
          "h-full overflow-auto overflow-x-hidden flex flex-col pt-[96px] pb-[10px] px-[23px] before:bg-landing before:bg-center before:absolute before:inset-0 before:z-[-1]"
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
        <section className="flex flex-col text-primary text-[18px] leading-7 items-center justify-center text-center mt-[57px] mb-[60px]">
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
            "font-semibold h-[60px] text-xl leading-6"
          )}
        >
          {"Wow, let's go!"}
        </Link>
      </main>
    </>
  );
}
