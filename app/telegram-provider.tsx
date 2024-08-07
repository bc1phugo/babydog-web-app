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

  useEffect(function handleWebAppInit() {
    if (WebApp) {
      WebApp.expand();
      // set header color
      WebApp.setHeaderColor("#ffffff");
      WebApp.setBackgroundColor("#ffffff");

      setWebApp(WebApp);
    }
  }, []);

  useEffect(() => {
    if (!WebApp) return;
    const handleEvent = (payload: { isStateStable: boolean }) => {
      if (payload.isStateStable) {
        WebApp.ready();
      }
    };

    WebApp.onEvent("viewportChanged", handleEvent);
    return () => WebApp.offEvent("viewportChanged", handleEvent);
  }, [webApp]);

  useEffect(
    function handleTelegramButton() {
      if (webApp) {
        // initial page setup
        WebApp.BackButton.onClick(router.back);
        if (pathname === "/") {
          WebApp.BackButton.hide();
        } else {
          WebApp.BackButton.show();
        }
      }
    },
    [webApp, pathname, router.back]
  );

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
