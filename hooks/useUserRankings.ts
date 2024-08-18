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
  customEnabled: boolean;
}) {
  const { user } = useTelegram();
  const query = useQuery({
    queryKey: ["userRankings", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${user?.id}/rankings`);
      const data = await response.json();
      return data as IUserRanking;
    },
    enabled: !!user && !!user.id && customEnabled,
  });

  query.data &&
    console.log("🚀 ~ useUserRankingsQuery ~ query.data:", query.data);

  return query;
}
