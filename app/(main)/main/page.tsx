"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import BabyDogPointDetail from "./components/baby-dog-point-detail";
import { IDbUserData } from "@/app/(landing)/account-score/page";
import { useTelegram } from "@/app/providers/telegram-provider";
import { useQuery } from "@tanstack/react-query";

export interface IDBUserAvailableTask {
  id: number;
  task_name: string;
  description: string;
  points: number;
  icon_type: "link" | "friends" | "twitterX" | "check";
  visible: boolean;
}

export default function MainPage() {
  const { user } = useTelegram();
  const { data: userData } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${user?.id}`);
      const data = await response.json();
      return data as IDbUserData;
    },
    enabled: !!user && !!user.id,
  });

  const { data: userAvailableTasks } = useQuery({
    queryKey: ["userTasks", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${user?.id}/tasks`);
      const data = await response.json();
      return data as IDBUserAvailableTask[];
    },
    enabled: !!user && !!user.id,
  });

  return (
    <>
      <div className="mt-[67px] px-[23px]">
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <Image
              priority
              src="/images/babydog-4.png"
              width={190}
              height={154}
              alt={"image-baby-dog"}
              className="m-auto"
            />
            <div className="font-semibold text-4xl mt-[10px]">
              {userData?.baby_dog_points} BABY DOGS
            </div>
          </div>
          <div className="mt-[30px]">
            <div className="flex justify-between gap-[30px]">
              <div>
                <div className="text-muted-foreground leading-[22px] font-normal tracking-tight">
                  Rewards
                </div>
                <div className={cn("flex gap-[5px]")}>
                  <span className="text-center text-[18px] leading-[22px] font-semibold tracking-tight">
                    + 600
                  </span>
                  <Image
                    priority
                    src="/images/three-puppies.svg"
                    alt="three-puppies-image"
                    width={36}
                    height={17}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="text-muted-foreground leading-[22px] font-normal tracking-tight">
                    Task
                  </div>
                  <div className={cn("flex gap-[5px]")}>
                    <span className="text-center text-[18px] leading-[22px] font-semibold tracking-tight">
                      + 0
                    </span>
                    <Image
                      priority
                      src="/images/three-puppies.svg"
                      alt="three-puppies-image"
                      width={36}
                      height={17}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground leading-[22px] font-normal tracking-tight">
                  Invites
                </div>
                <div className={cn("flex gap-[5px]")}>
                  <span className="text-center text-[18px] leading-[22px] font-semibold tracking-tight">
                    + 0
                  </span>
                  <Image
                    priority
                    src="/images/three-puppies.svg"
                    alt="three-puppies-image"
                    width={36}
                    height={17}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-20 flex flex-col gap-[15px]">
          <Link
            href={"/main"}
            className={cn(
              buttonVariants({ variant: "orange", size: "xl" }),
              "font-semibold text-xl leading-6 w-full"
            )}
          >
            Join Baby dog channel
          </Link>
          <Link
            href={"/main"}
            className={cn(
              buttonVariants({ variant: "gray", size: "xl" }),
              "text-xl leading-6 w-full"
            )}
          >
            Follow Baby dog X.COM
          </Link>
        </section>
      </div>
      <BabyDogPointDetail userAvailableTasks={userAvailableTasks ?? []} />
    </>
  );
}
