"use client";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { VerifiedIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function AccountCheckPage() {
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

  if (!userData) return <div>No User Data</div>;

  return (
    <main className="flex min-h-dvh flex-col py-16 gap-10 px-4">
      <>
        <section className="flex justify-center text-center">
          <h1 className="text-3xl font-bold">
            Checking <br />
            your account
          </h1>
        </section>
        {/* <ul>
          <li>ID : {userData.id}</li>
          <li>First Name : {userData.first_name}</li>
          <li>Last Name : {userData.last_name}</li>
          <li>User Name : {userData.username}</li>
          <li>Language Code : {userData.language_code}</li>
          <li>Is Premium : {userData.is_premium ? "YES" : "NO"}</li>
        </ul> */}

        <div>
          <div className="flex justify-between">
            Account Age Verified
            <VerifiedIcon
              className={cn(
                linkDisabled ? "text-muted-foreground" : "text-customGreen"
              )}
            />
          </div>
          <Progress
            className={cn("h-3 mt-3")}
            value={accountAgeChecked ? 100 : 0}
          />
        </div>
        <div>
          <div className="flex justify-between">
            Acitivy Level Analyzed{" "}
            <VerifiedIcon
              className={cn(
                linkDisabled ? "text-muted-foreground" : "text-customGreen"
              )}
            />
          </div>
          <Progress
            className="h-3 mt-3"
            defaultValue={0}
            value={activityLevelChecked ? 100 : 0}
          />
        </div>
        <div>
          <div className="flex justify-between">
            Telegram Premium Checked
            <VerifiedIcon
              className={cn(
                linkDisabled ? "text-muted-foreground" : "text-customGreen"
              )}
            />
          </div>
          <Progress
            className="h-3 mt-3"
            defaultValue={0}
            value={isPremiumChecked ? 100 : 0}
          />
        </div>
        <div>
          <div className="flex justify-between">
            OG Status Confirmed
            <VerifiedIcon
              className={cn(
                linkDisabled ? "text-muted-foreground" : "text-customGreen"
              )}
            />
          </div>
          <Progress
            className="h-3 mt-3"
            defaultValue={0}
            value={ogStatusChecked ? 100 : 0}
          />
        </div>

        <Link
          href={"/main"}
          className={cn(buttonVariants({ variant: "blue" }))}
          aria-disabled={linkDisabled}
        >
          Continue
        </Link>
      </>
    </main>
  );
}
