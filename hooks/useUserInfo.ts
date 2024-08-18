import { useTelegram } from "@/app/providers/telegram-provider";
import { useQuery } from "@tanstack/react-query";

export interface IUserInfo {
  user: {
    id: number;
    telegram_id: string;
    username: string;
    first_name: string;
    last_name: string;
    language_code: string;
    is_premium: boolean;
    photo_url: string | null;
    baby_dog_points: number;
    referral_code: string;
    created_at: string;
  };
  tasks: Array<{
    id: number;
    task_name: string;
    description: string | null;
    points: number;
    visible: boolean;
    icon_type: "link" | "friends" | "twitterX" | "check";
  }>;
  reward: any[]; // Adjust the type if you know the exact structure of the rewards
  userExist: boolean;
}

export default function useUserInfoQuery() {
  const { user } = useTelegram();
  const query = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${user?.id}`);
      const data = await response.json();
      return data as IUserInfo;
    },
    enabled: !!user && !!user.id,
  });
  query.data;

  query.data && console.log("🚀 ~ useUserInfoQuery ~ query.data:", query.data);

  return query;
}
