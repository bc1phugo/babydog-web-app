import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      {`Hey! You've been in Telegram for a while, it's time to get rewarded!`}
      <Link
        href={"/account-check"}
        className={buttonVariants({ variant: "default" })}
      >
        Continue
      </Link>
    </main>
  );
}
