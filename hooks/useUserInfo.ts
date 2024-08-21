import { useTelegram } from "@/app/providers/telegram-provider";
import { useQuery } from "@tanstack/react-query";

export interface ITargetMission {
  id: number;
  mission_name: string;
  description: string | null;
  points: number;
  visible: boolean;
  icon_type: TIconType;
}

export interface IDBUser {
  id: number;
  telegram_id: string;
  username: string;
  first_name: string;
  last_name: string;
  language_code: string;
  is_premium: boolean;
  photo_url: string | null;
  baby_dog_points: number;
  reward_points: number;
  task_points: number;
  invite_points: number;
  referral_code: string;
  created_at: string;
}

export interface IUserInfo {
  user: IDBUser;
  missions: Array<ITargetMission>;
  rewards: IReward[]; // Adjust the type if you know the exact structure of the rewards
  userExist: boolean;
}

interface IReward {
  mission_name: string;
  total_points: string;
  icon_type: TIconType;
  mission_type: TMissionType;
}

export type TIconType =
  | "icon_website"
  | "icon_telegram"
  | "icon_youtube"
  | "icon_invite"
  | "icon_age"
  | "icon_premium"
  | "icon_friends";

export type TMissionType = "task" | "invite" | "reward";

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
    staleTime: 1000 * 10,
  });

  return query;
}
