import useUserInfoQuery, { IDBUser, ITargetMission } from "@/hooks/useUserInfo";
import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { useTelegram } from "./telegram-provider";

export default function RewardMissionProvider({ children }: PropsWithChildren) {
  const { data: userInfo, refetch: refetchUserInfo } = useUserInfoQuery();
  const { webApp, user } = useTelegram();

  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.userExist) || !webApp) return;
    const completePremium = async (
      premiumMission: ITargetMission,
      user: IDBUser,
    ) => {
      if (!user) return;
      try {
        await fetch(`/api/user/${user.telegram_id}/mission/premium`, {
          method: "POST",
          body: JSON.stringify({
            mission_id: premiumMission.id,
            telegram_id: user.telegram_id,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-telegram-data": webApp?.initData ?? "",
          },
        });
        await refetchUserInfo();
      } catch (error) {
        console.error("Premium Check Failed", error);
      }
    };

    const availableRewardMissins = userInfo.missions.filter(
      (mission) => mission.mission_type === "reward",
    );
    availableRewardMissins.forEach(async (rewardMission) => {
      if (
        rewardMission.mission_name === "Telegram Premium" &&
        user?.is_premium
      ) {
        await completePremium(rewardMission, userInfo.user);
      }
    });
  }, [refetchUserInfo, user?.is_premium, userInfo, webApp, webApp?.initData]);

  return <>{children}</>;
}
