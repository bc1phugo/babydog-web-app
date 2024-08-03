"use client";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

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
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
