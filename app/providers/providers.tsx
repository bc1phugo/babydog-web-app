"use client";
import { PropsWithChildren } from "react";
import { TelegramProvider } from "./telegram-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClientOnClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retryOnMount: true,
      refetchOnReconnect: true,
      gcTime: 1000 * 60 * 10,
    },
  },
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <TelegramProvider>
      <QueryClientProvider client={queryClientOnClient}>
        {children}
      </QueryClientProvider>
    </TelegramProvider>
  );
}
