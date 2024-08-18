import { IDbUserData } from "@/app/(landing)/account-score/page";
import { useTelegram } from "@/app/providers/telegram-provider";
import { useQuery } from "@tanstack/react-query";

export default function useUserInfoQuery() {
  const { user } = useTelegram();
  const query = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${user?.id}`);
      const data = await response.json();
      return data as IDbUserData;
    },
    enabled: !!user && !!user.id,
  });

  return query;
}
