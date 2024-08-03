"use client";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

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

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  return (
    <main>
      {userData ? (
        <>
          <h1>User Data</h1>
          <ul>
            <li>ID : {userData.id}</li>
            <li>First Name : {userData.first_name}</li>
            <li>Last Name : {userData.last_name}</li>
            <li>User Name : {userData.username}</li>
            <li>Language Code : {userData.language_code}</li>
            <li>Is Premium : {userData.is_premium ? "YES" : "NO"}</li>

            <Link
              href={"/main"}
              className={buttonVariants({ variant: "default" })}
            >
              Continue
            </Link>
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
