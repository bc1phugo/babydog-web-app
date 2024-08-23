import { useTelegram } from "@/app/providers/telegram-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { WebAppUser } from "@twa-dev/types";

interface CreateUserParams extends WebAppUser {
  telegram_id: string;
  referral_code?: string | null;
}

const useCreateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { user, webApp } = useTelegram();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUserData: CreateUserParams) => {
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-telegram-data": webApp?.initData ?? "",
        },
        body: JSON.stringify(newUserData),
      });

      console.log("response.ok : ", response.ok);
      // if (!response.ok) {
      //   throw new Error("Failed to create user");
      // }
      return response.json();
    },
    onSuccess: () => {
      // Invalidate or refetch the queries after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["userRankings", user?.id] });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      console.error("Unexpected error:", error);
    },
  });
};

export default useCreateUser;
