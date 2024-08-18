"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import XIcon from "/public/icons/icon_x.svg";
import LinkIcon from "/public/icons/icon_link.svg";
import CheckCircleIcon from "/public/icons/icon_check_circle.svg";
import AddFriendsIcon from "/public/icons/icon_add_friends.svg";
import { ReactElement, ReactSVGElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTelegram } from "@/app/providers/telegram-provider";

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

export default function BabyDogPointDetail() {
  const tasks: Array<ITask> = [
    {
      headerIcon: () => <CheckCircleIcon width={30} height={30} />,
      mission: "Join Baby Dog channel",
      point: 3000,
      buttonType: "start",
    },
    {
      headerIcon: () => <XIcon width={30} height={30} />,
      mission: "Subscribe to Baby dog X.com",
      point: 1000,
      buttonType: "start",
    },
    {
      headerIcon: () => <XIcon width={30} height={30} />,
      mission: "Subscribe to Dog X.com",
      point: 1000,
      buttonType: "start",
    },
    {
      headerIcon: () => <LinkIcon width={30} height={30} />,
      mission: "Subscribe to Baby Dog Youtube",
      point: 1000,
      buttonType: "start",
    },
    {
      headerIcon: () => <AddFriendsIcon width={30} height={30} />,
      mission: "Invite friends to BABY DOG",
      point: 20000,
      buttonType: "check",
    },
  ];

  const rewards: Array<IReward> = [
    {
      headerIcon: () => <LinkIcon width={30} height={30} />,
      mission: "Account age",
      point: 300,
    },
    {
      headerIcon: () => <XIcon width={30} height={30} />,
      mission: "Telegram Premium",
      point: 10000,
    },
    {
      headerIcon: () => <AddFriendsIcon width={30} height={30} />,
      mission: "Invited friends",
      point: 3000,
    },
  ];

  return (
    <section className="flex flex-col items-center rounded-t-[50px] bg-[#FFF8F2] mt-[80px] pb-[140px]">
      <h2 className="text-4xl font-semibold mt-[44px]">Task</h2>
      <div className="flex flex-col gap-2 mt-10 w-full max-w-[700px] px-[23px]">
        <Table className="">
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.mission}>
                <TableCell className="px-0 w-[30px]">
                  {task.headerIcon()}
                </TableCell>
                <TableCell className="pl-2 pr-0 gap-[3px] tracking-tight">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground font-medium text-[16px] leading-6">
                      {task.mission}
                    </span>
                    <span className="text-[18px] leading-6 font-semibold">
                      + {task.point} BABY DOGS
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-0 flex justify-end">
                  {task.buttonType === "start" ? (
                    <Button variant={"gray"} className="w-20 tracking-tight">
                      Start
                    </Button>
                  ) : (
                    <Button variant={"orange"} className="w-20 tracking-tight">
                      Check
                    </Button>
                  )}
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
            {rewards.map((reward) => (
              <TableRow key={reward.mission}>
                <TableCell className="px-0 w-[30px]">
                  {reward.headerIcon()}
                </TableCell>
                <TableCell className="pl-2 pr-0 gap-[3px] text-muted-foreground text-[16px] leading-6 font-medium tracking-tight">
                  {reward.mission}
                </TableCell>
                <TableCell className="px-0 text-[18px] leading-6 font-semibold text-end tracking-tight">
                  + {reward.point} BABY DOG
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
