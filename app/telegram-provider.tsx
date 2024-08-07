"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { WebApp as IWebApp, WebAppUser } from "@twa-dev/types";
import { usePathname, useRouter } from "next/navigation";
import WebApp from "@twa-dev/sdk";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: WebAppUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp) {
      WebApp.expand();
      // set header color
      WebApp.setHeaderColor("#ffffff");
      WebApp.setBackgroundColor("#ffffff");

      setWebApp(WebApp);
    }
  }, []);

  useEffect(() => {
    if (!webApp) return;
    const handleEvent = (payload: { isStateStable: boolean }) => {
      if (payload.isStateStable) {
        webApp.ready();
      }
    };

    webApp.onEvent("viewportChanged", handleEvent);
    return () => webApp.offEvent("viewportChanged", handleEvent);
  }, [webApp]);

  useEffect(
    function handleTelegramButton() {
      if (webApp) {
        // initial page setup
        webApp.BackButton.onClick(router.back);
        if (pathname === "/") {
          webApp.BackButton.hide();
        } else {
          webApp.BackButton.show();
        }
      }
    },
    [webApp, pathname, router.back]
  );

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
