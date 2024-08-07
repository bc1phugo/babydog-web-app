"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { WebApp as IWebApp, WebAppUser } from "@twa-dev/types";
import { usePathname, useRouter } from "next/navigation";
import WebApp from "@twa-dev/sdk";
import Script from "next/script";

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
      WebApp.ready();
      setWebApp(WebApp);
    }
  }, []);

  useEffect(() => {
    if (!webApp) return;

    const handleEvent = (payload: { isStateStable: boolean }) => {
      if (payload.isStateStable) {
        webApp?.ready();
      }
    };

    webApp.onEvent("viewportChanged", handleEvent);

    return () => webApp.offEvent("viewportChanged", handleEvent);
  }, [webApp]);

  useEffect(() => {
    const goBack = () => router.back();
    if (webApp) {
      webApp.expand();
      webApp.setHeaderColor("#ffffff");
      webApp.setBackgroundColor("#ffffff");

      webApp.onEvent("backButtonClicked", goBack);

      if (pathname === "/") {
        webApp.BackButton.hide();
      } else {
        webApp.BackButton.show();
      }

      return () => webApp.offEvent("backButtonClicked", goBack);
    }
  }, [pathname, webApp, router]);

  return (
    <TelegramContext.Provider value={value}>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
