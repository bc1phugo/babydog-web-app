"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Error() {
  return (
    <>
      <Head>
        <link rel="preload" href="/images/babydog-3.png" as="image" />
      </Head>
      <main
        className={cn(
          "flex h-full flex-col overflow-auto overflow-x-hidden px-[23px] pb-[30px] pt-[40px]",
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
        <section className="mb-[10px] mt-[27px] flex flex-col items-center justify-center text-center text-[18px] leading-7 text-primary">
          <div className="text-4xl font-semibold">{`Oops!`}</div>
          <div className="mt-5 text-md text-muted-foreground">
            Sorry. Page not found. The page you were looking for appears to have
            been moved, deleted or does not exist.
          </div>
        </section>
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "orange", size: "xl" }),
            "h-[60px] w-full text-xl font-semibold leading-6",
          )}
        >
          Back
        </Link>
      </main>
    </>
  );
}
