import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import XIcon from "/public/icons/icon_x.svg";
import LinkIcon from "/public/icons/icon_link.svg";
import CheckCircleIcon from "/public/icons/icon_check_circle.svg";
import BoneIcon from "/public/icons/icon_bone.svg";
import AddFriendsIcon from "/public/icons/icon_add_friends.svg";
import { ReactElement, ReactSVGElement } from "react";

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
      headerIcon: () => <LinkIcon width={30} height={30} />,
      mission: "Subscribe to Youtube",
      point: 100,
      buttonType: "start",
    },
    {
      headerIcon: () => <XIcon width={30} height={30} />,
      mission: "Subscribe to Baby dog X.com",
      point: 1000,
      buttonType: "start",
    },
    {
      headerIcon: () => <AddFriendsIcon width={30} height={30} />,
      mission: "Invite 5 friends to BABY DOG",
      point: 20000,
      buttonType: "check",
    },
    {
      headerIcon: () => <BoneIcon width={30} height={30} />,
      mission: "Send 🐕 to Binance X.com",
      point: 100,
      buttonType: "check",
    },
    {
      headerIcon: () => <BoneIcon width={30} height={30} />,
      mission: "Send 🐕 to OKX X.com",
      point: 100,
      buttonType: "start",
    },
    {
      headerIcon: () => <BoneIcon width={30} height={30} />,
      mission: "Send 🐕 to Bybit X.com",
      point: 1000,
      buttonType: "start",
    },
  ];

  const rewards: Array<IReward> = [
    {
      headerIcon: () => <CheckCircleIcon width={30} height={30} />,
      mission: "Be a good dog 🐶",
      point: 50,
    },
    {
      headerIcon: () => <LinkIcon width={30} height={30} />,
      mission: "Account age",
      point: 3000,
    },
    {
      headerIcon: () => <XIcon width={30} height={30} />,
      mission: "Telegram Premium",
      point: 300,
    },
    {
      headerIcon: () => <AddFriendsIcon width={30} height={30} />,
      mission: "Invited friends",
      point: 1042,
    },
  ];

  return (
    <section className="flex flex-col items-center rounded-t-[50px] bg-[#FFF8F2] mt-[80px]">
      <h2 className="text-4xl font-semibold mt-[44px]">Task</h2>
      <div className="flex flex-col gap-2 mt-10">
        <Table>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.mission}>
                <TableCell className="px-0">{task.headerIcon()}</TableCell>
                <TableCell className="px-2 gap-[3px]">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground font-medium">
                      {task.mission}
                    </span>
                    <span className="text-[18px] leading-6 font-semibold">
                      + {task.point} BABY DOGS
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-0">
                  {task.buttonType === "start" ? (
                    <Button variant={"gray"} className="w-20">
                      Start
                    </Button>
                  ) : (
                    <Button variant={"orange"} className="w-20">
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
      <div className="flex flex-col gap-2 mt-10">
        <Table className="w-full">
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.mission}>
                <TableCell className="px-0">{task.headerIcon()}</TableCell>
                <TableCell className="px-2 gap-[3px]">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground font-medium">
                      {task.mission}
                    </span>
                    <span className="text-[18px] leading-6 font-semibold">
                      + {task.point} BABY DOGS
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-0">
                  {task.buttonType === "start" ? (
                    <Button variant={"gray"} className="w-20">
                      Start
                    </Button>
                  ) : (
                    <Button variant={"orange"} className="w-20">
                      Check
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
