"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import XIcon from "/public/icons/icon_x.svg";
import LinkIcon from "/public/icons/icon_link.svg";
import CheckCircleIcon from "/public/icons/icon_check_circle.svg";
import AddFriendsIcon from "/public/icons/icon_add_friends.svg";
import StarSmileIcon from "/public/icons/icon_star_smile.svg";
import BoneIcon from "/public/icons/icon_bone.svg";
import useUserInfoQuery, {
  ITargetMission,
  IUserInfo,
} from "@/hooks/useUserInfo";
import { useToast } from "@/components/ui/use-toast";
import { useTelegram } from "@/app/providers/telegram-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BabyDogPointDetailProps {
  userInfo: IUserInfo;
}

export default function BabyDogMissionBoard({
  userInfo,
}: BabyDogPointDetailProps) {
  const { refetch: refetchUserInfo } = useUserInfoQuery();
  const { webApp } = useTelegram();
  const { toast } = useToast();
  const iconMap = {
    icon_age: <CheckCircleIcon width={30} height={30} />,
    icon_website: <LinkIcon width={30} height={30} />,
    icon_youtube: <LinkIcon width={30} height={30} />,
    icon_telegram: <LinkIcon width={30} height={30} />,
    icon_invite: <AddFriendsIcon width={30} height={30} />,
    icon_friends: <AddFriendsIcon width={30} height={30} />,
    icon_premium: <StarSmileIcon width={30} height={30} />,
  };

  const handleCompleteButton = (mission: ITargetMission) => {
    switch (mission.mission_name) {
      case "Telegram Premium": {
        return (
          <Button
            onClick={() => {
              const url = "https://t.me/premium";
              if (webApp) {
                webApp.openTelegramLink(url);
              } else {
                window.open(url, "_blank");
              }
            }}
            variant={"orange"}
            className="w-20 tracking-tight"
          >
            Start
          </Button>
        );
      }
      case "Join Baby Dog channel": {
        return (
          <Button
            variant={"orange"}
            className="w-20 tracking-tight"
            onClick={async () => {
              const url = "https://t.me/+fNtW_O4vdwswYThl";
              if (webApp) {
                webApp.openTelegramLink(url);
              } else {
                window.open(url, "_blank");
              }
              await executeCompleteMission(mission);
            }}
          >
            Start
          </Button>
        );
      }
      case "Subscribe to Dog X.com": {
        return (
          <Button
            variant={"orange"}
            className="w-20 tracking-tight"
            onClick={async () => {
              const url = "https://t.me/+fNtW_O4vdwswYThl";
              if (webApp) {
                webApp.openTelegramLink(url);
              } else {
                window.open(url, "_blank");
              }
              await executeCompleteMission(mission);
            }}
          >
            Start
          </Button>
        );
      }
      case "Subscribe to Baby Dog X.com": {
        return (
          <Button
            onClick={async () => {
              const url = "https://x.com/BabydogrRunes";
              if (webApp) {
                webApp.openLink(url);
              } else {
                window.open(url, "_blank");
              }
              await executeCompleteMission(mission);
            }}
            variant={"orange"}
            className="w-20 tracking-tight"
          >
            Start
          </Button>
        );
      }
      case "Invite friends to Baby Dog": {
        return (
          <Link
            className={cn(
              buttonVariants({ variant: "orange" }),
              "w-20 tracking-tight"
            )}
            href="/main/friends"
          >
            Start
          </Link>
        );
      }
      case "Subscribe to Baby Dog Youtube": {
        return (
          <Button
            onClick={async () => {
              const url =
                "https://www.youtube.com/channel/UC5aLROOknlQkNzsi9hLbrUQ";
              if (webApp) {
                webApp.openLink(url);
              } else {
                window.open(url, "_blank");
              }

              await executeCompleteMission(mission);
            }}
            variant={"orange"}
            className="w-20 tracking-tight"
          >
            Start
          </Button>
        );
      }
    }
  };

  const executeCompleteMission = async (mission: ITargetMission) => {
    try {
      const response = await fetch(
        `/api/user/${userInfo.user.telegram_id}/mission`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mission_id: mission.id,
            telegram_id: userInfo.user.telegram_id,
          }),
        }
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setTimeout(() => {
        refetchUserInfo();
        toast({
          title: "Mission Success",
          description: `${mission.mission_name} + ${mission.points}`,
        });
      }, 3000);
    } catch (error) {
      toast({
        title: "Something went wrong...",
        description: `${mission.mission_name}`,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex flex-col items-center rounded-t-[50px] bg-[#FFF8F2] mt-[80px] pb-[140px]">
      <h2 className="text-4xl font-semibold mt-[44px]">Task</h2>
      <div className="flex flex-col gap-2 mt-10 w-full max-w-[700px] px-[23px]">
        <Table>
          <TableBody>
            {userInfo.missions
              .filter((mission) => mission.visible)
              .map((mission) => (
                <TableRow key={mission.id}>
                  <TableCell className="px-0 w-[30px]">
                    {iconMap[mission.icon_type] ?? (
                      <BoneIcon width={30} height={30} />
                    )}
                  </TableCell>
                  <TableCell className="pl-2 pr-0 gap-[3px] tracking-tight">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground font-medium text-[16px] leading-6">
                        {mission.mission_name}
                      </span>
                      <span className="text-[18px] leading-6 font-semibold">
                        + {mission.points} BABY DOGS
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-0">
                    <div className="flex justify-end">
                      {handleCompleteButton(mission)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <h2 className="text-4xl font-semibold mt-[44px]">Your rewards</h2>
      <div className="flex flex-col gap-2 mt-10 w-full max-w-[700px] px-[23px]">
        <Table className="w-full">
          <TableBody>
            {userInfo.rewards.map((reward, index) => (
              <TableRow
                key={reward.mission_name + reward.mission_name + String(index)}
              >
                <TableCell className="px-0 w-[30px]">
                  {iconMap[reward.icon_type] ?? (
                    <BoneIcon width={30} height={30} />
                  )}
                </TableCell>
                <TableCell className="pl-2 pr-0 gap-[3px] text-muted-foreground text-[16px] leading-6 font-medium tracking-tight">
                  {reward.mission_name}
                </TableCell>
                <TableCell className="px-0 text-[18px] leading-6 font-semibold text-end tracking-tight">
                  + {reward.total_points} BABY DOG
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
