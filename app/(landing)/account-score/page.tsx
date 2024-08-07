"use client";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Phase1 from "./components/phase1";
import Phase2 from "./components/phase2";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function AccountScorePage() {
  const testerUser =
    process.env.NODE_ENV === "development"
      ? {
          id: 123123,
          first_name: "Hugo",
          last_name: "oh",
          username: "Hugooh",
          language_code: "en",
          is_premium: true,
        }
      : null;

  const [userData, setUserData] = useState<UserData | null>(testerUser);
  const [accountAgeChecked, setAccountAgeChecked] = useState<boolean>(false);
  const [activityLevelChecked, setActivityLevelChecked] =
    useState<boolean>(false);
  const [isPremiumChecked, setIsPremiumChecked] = useState<boolean>(false);
  const [ogStatusChecked, setOgStatusChecked] = useState<boolean>(false);
  const [linkDisabled, setLinkDisabled] = useState<boolean>(true);
  const [currentPhase, setCurrentPhase] = useState<1 | 2>(1);
  const isLastPhase = currentPhase === 2;

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }

    setTimeout(() => {
      setAccountAgeChecked(true);
      setActivityLevelChecked(true);
      setIsPremiumChecked(true);
      setOgStatusChecked(true);
    }, 500);

    setTimeout(() => {
      setLinkDisabled(false);
    }, 3500);
  }, []);

  return (
    <main className="flex flex-col pt-[20px] px-[23px]">
      <section>
        <div className="flex gap-2">
          <Progress
            className="h-[5px]"
            value={currentPhase >= 1 ? 100 : 0}
            onClick={() => setCurrentPhase(1)}
          />
          <Progress className="h-[5px]" value={currentPhase >= 2 ? 100 : 0} />
        </div>
        <div className="text-center flex-1">
          {currentPhase === 1 ? <Phase1 /> : <Phase2 />}
        </div>
      </section>

      {isLastPhase ? (
        <Link
          href={"/main"}
          className={cn(
            buttonVariants({ variant: "orange", size: "xl" }),
            "font-semibold text-xl leading-6"
          )}
          aria-disabled={linkDisabled}
        >
          Continue
        </Link>
      ) : (
        <Button
          variant="orange"
          size="xl"
          className={cn("font-semibold text-xl leading-6")}
          onClick={() => setCurrentPhase((prev) => (prev + 1) as 1 | 2)}
        >
          Continue
        </Button>
      )}
    </main>
  );
}
