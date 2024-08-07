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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
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
      WebApp.expand();
      setWebApp(WebApp);
    }
  }, []);

  useEffect(() => {
    if (webApp) {
      // setTimeout(() => webApp.expand(), 3000);
    }
  }, [webApp, isExpanded]);

  useEffect(() => {
    if (!webApp) return;

    const handleEvent = (payload: { isStateStable: boolean }) => {
      if (payload.isStateStable) {
        setIsExpanded(webApp.isExpanded);
      }
    };

    webApp.onEvent("viewportChanged", handleEvent);

    return () => webApp.offEvent("viewportChanged", handleEvent);
  }, [webApp]);

  useEffect(() => {
    const goBack = () => router.back();
    if (webApp) {
      webApp.setBackgroundColor("#ffffff");

      webApp.onEvent("backButtonClicked", goBack);

      if (pathname === "/") {
        webApp.setHeaderColor("#faf5f2");
        webApp.BackButton.hide();
      } else {
        webApp.setHeaderColor("#ffffff");
        webApp.BackButton.show();
      }

      return () => webApp.offEvent("backButtonClicked", goBack);
    }
  }, [pathname, webApp, router]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
