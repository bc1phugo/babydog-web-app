import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col justify-center gap-10 px-4">
      <section>
        <Skeleton className="w-full h-[200px] rounded-full" />
      </section>
      <section>
        {`Hey! You've been in Telegram for a while, it's time to get rewarded!`}
      </section>
      <Link
        href={"/account-check"}
        className={buttonVariants({ variant: "secondary" })}
      >
        {"Wow, let's go!"}
      </Link>
    </main>
  );
}
