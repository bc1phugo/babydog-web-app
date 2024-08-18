"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import XIcon from "/public/icons/icon_x.svg";
import LinkIcon from "/public/icons/icon_link.svg";
import CheckCircleIcon from "/public/icons/icon_check_circle.svg";
import AddFriendsIcon from "/public/icons/icon_add_friends.svg";
import BoneIcon from "/public/icons/icon_bone.svg";
import { ReactElement, ReactSVGElement } from "react";
import { IDBUserAvailableTask } from "../page";
import useUserInfoQuery, { IUserInfo } from "@/hooks/useUserInfo";

interface ITask {
  headerIcon: () => ReactElement;
  mission: string;
  point: number;
  buttonType: "start" | "check";
}

interface IReward {
  headerIcon: () => ReactElement;
  mission: string;
  point: number;
}

interface BabyDogPointDetailProps {
  userInfo: IUserInfo;
}

export default function BabyDogPointDetail({
  userInfo,
}: BabyDogPointDetailProps) {
  const { refetch } = useUserInfoQuery();
  const iconMap = {
    check: <CheckCircleIcon width={30} height={30} />,
    twitterX: <XIcon width={30} height={30} />,
    link: <LinkIcon width={30} height={30} />,
    friends: <AddFriendsIcon width={30} height={30} />,
  };

  return (
    <section className="flex flex-col items-center rounded-t-[50px] bg-[#FFF8F2] mt-[80px] pb-[140px]">
      <h2 className="text-4xl font-semibold mt-[44px]">Task</h2>
      <div className="flex flex-col gap-2 mt-10 w-full max-w-[700px] px-[23px]">
        <Table className="">
          <TableBody>
            {userInfo.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="px-0 w-[30px]">
                  {/* {task.headerIcon()} */}
                  {iconMap[task.icon_type] ?? (
                    <BoneIcon width={30} height={30} />
                  )}
                </TableCell>
                <TableCell className="pl-2 pr-0 gap-[3px] tracking-tight">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground font-medium text-[16px] leading-6">
                      {task.task_name}
                    </span>
                    <span className="text-[18px] leading-6 font-semibold">
                      + {task.points} BABY DOGS
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-0 flex justify-end">
                  <Button
                    variant={"orange"}
                    className="w-20 tracking-tight"
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          `/api/user/${userInfo.user.telegram_id}/task`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              task_id: task.id,
                              telegram_id: userInfo.user.telegram_id,
                            }),
                          }
                        );
                        const data = response.json();
                        console.log(data);
                      } catch (error) {
                        console.log("POST COMPLETE TASK FAILED: ", error);
                      } finally {
                        refetch();
                      }
                    }}
                  >
                    Start
                  </Button>
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
            {userInfo.reward.map((reward) => (
              <TableRow key={reward.task_name + reward.awarded_at}>
                <TableCell className="px-0 w-[30px]">
                  <CheckCircleIcon width={30} height={30} />
                </TableCell>
                <TableCell className="pl-2 pr-0 gap-[3px] text-muted-foreground text-[16px] leading-6 font-medium tracking-tight">
                  {reward.task_name}
                </TableCell>
                <TableCell className="px-0 text-[18px] leading-6 font-semibold text-end tracking-tight">
                  + {reward.points} BABY DOG
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
