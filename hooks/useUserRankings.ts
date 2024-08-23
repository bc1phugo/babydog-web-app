import { useTelegram } from "@/app/providers/telegram-provider";
import { useQuery } from "@tanstack/react-query";

interface IUser {
  username: string | null;
  first_name: string;
  last_name: string | null;
  baby_dog_points: number;
  rank: number;
}

interface IUserRanking {
  top20: IUser[];
  userRank: IUser;
  userCount: number;
}

export default function useUserRankingsQuery({
  customEnabled = true,
}: {
  customEnabled?: boolean;
}) {
  const { user, webApp } = useTelegram();
  const query = useQuery({
    queryKey: ["userRankings", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${user?.id}/rankings`, {
        headers: { "x-telegram-data": webApp?.initData ?? "" },
      });
      const data = await response.json();
      return data as IUserRanking;
    },
    enabled: !!user && !!user.id && customEnabled,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}
