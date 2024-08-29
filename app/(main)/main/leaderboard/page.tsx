"use client";
import { useTelegram } from "@/app/providers/telegram-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useUserRankingsQuery from "@/hooks/useUserRankings";
import { cn, formatNumber } from "@/lib/utils";
import Image from "next/image";

export default function LeaderboardPage() {
  const { data: userRankings } = useUserRankingsQuery({ customEnabled: true });
  const { user } = useTelegram();

  const userName = user?.username ?? user?.first_name ?? "Mr.Unknown";

  const getRankingCellContent = (targetRank: number) => {
    switch (targetRank) {
      case 1: {
        return (
          <Image
            priority
            src="/images/image_medal_gold.png"
            width={24.25}
            height={40}
            alt="medal_gold"
          />
        );
      }
      case 2: {
        return (
          <Image
            priority
            src="/images/image_medal_silver.png"
            width={24.25}
            height={40}
            alt="medal_gold"
          />
        );
      }
      case 3: {
        return (
          <Image
            priority
            src="/images/image_medal_copper.png"
            width={24.25}
            height={40}
            alt="medal_gold"
          />
        );
      }
      default: {
        return `#${targetRank}`;
      }
    }
  };

  const getInitials = (userName: string) => {
    const words = userName.trim().split(/\s+/); // Split the name by whitespace

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    const initials = words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(); // Get first letter of each word, join them, and take the first two

    // Ensure uppercase initials

    return initials;
  };

  //TODO: 나중에 Skeleton으로 바꾸셈
  if (!userRankings) return null;

  return (
    <>
      <div className="mt-[25px] px-[23px]">
        <section className="flex flex-col items-center text-center">
          <div className="text-4xl font-semibold">
            Telegram <br />
            Wall of Fame
          </div>
          {userRankings ? (
            <div
              className={cn(
                buttonVariants({ variant: "gray" }),
                "mt-[44px] flex h-20 w-full justify-start pl-5 pr-[14px]",
              )}
            >
              <Avatar className="mr-[10px]">
                <AvatarFallback className="bg-purple-600 text-[18px] leading-4 tracking-tight text-background">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="text-start">
                <div className="text-[16px] font-medium leading-6 tracking-tight">
                  {userName}
                </div>
                <div className="text-md font-semibold tracking-tight text-primary">
                  {userRankings.userRank.baby_dog_points} BABY DOGS
                </div>
              </div>
              <div className="ml-auto text-md font-medium">
                {getRankingCellContent(Number(userRankings.userRank.rank)) ??
                  "-"}
              </div>
            </div>
          ) : (
            <Skeleton
              className={cn(
                "mt-[44px] flex h-20 w-full animate-pulse justify-start rounded-full pl-5 pr-[14px]",
              )}
            />
          )}
        </section>
      </div>
      <section className="mt-[50px] flex flex-col items-center pb-[140px]">
        {userRankings ? (
          <>
            <h2 className="text-4xl font-semibold">
              {formatNumber(userRankings.userCount) ?? "-"} holders
            </h2>
            <div className="mt-8 flex w-full max-w-[700px] flex-col gap-2 px-[23px]">
              <Table className="">
                <TableBody>
                  {userRankings.top20.map((ranker) => {
                    const userName =
                      ranker.username ?? ranker.first_name ?? "Mr.Unkown";
                    return (
                      <TableRow key={`${userName}-${ranker.rank}`}>
                        <TableCell className="w-[40px] px-0">
                          <Avatar>
                            <AvatarFallback className="bg-red-600 text-[18px] leading-4 tracking-tight text-background">
                              {getInitials(userName)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="gap-[3px] pl-2 pr-0 tracking-tight">
                          <div className="flex flex-col">
                            <span className="text-[16px] font-medium leading-6 tracking-tight text-muted-foreground">
                              {ranker.username ??
                                ranker.first_name ??
                                "Mr.Unkown"}
                            </span>
                            <span className="text-[18px] font-semibold leading-6 tracking-tight">
                              + {ranker.baby_dog_points} BABY DOGS
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="justify-end px-0 text-[24px] leading-6">
                          <span className="flex justify-end font-semibold">
                            {getRankingCellContent(Number(ranker.rank))}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-[46px] w-[200px] animate-pulse rounded-full"></Skeleton>
            <div className="mt-8 flex w-full max-w-[700px] flex-col gap-2 px-[23px]">
              <Table>
                <TableBody>
                  <TableRow className="border-b-muted">
                    <TableCell className="w-[40px] px-0">
                      <Avatar>
                        <AvatarFallback className="animate-pulse bg-slate-200 text-[18px] leading-4 tracking-tight text-background" />
                      </Avatar>
                    </TableCell>
                    <TableCell className="gap-[3px] pl-2 pr-0 tracking-tight">
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-6 w-full animate-pulse text-[16px] font-medium leading-6 tracking-tight text-muted-foreground" />
                        <Skeleton className="h-6 w-full animate-pulse text-[18px] font-semibold leading-6 tracking-tight"></Skeleton>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b-muted">
                    <TableCell className="w-[40px] px-0">
                      <Avatar>
                        <AvatarFallback className="animate-pulse bg-slate-200 text-[18px] leading-4 tracking-tight text-background" />
                      </Avatar>
                    </TableCell>
                    <TableCell className="gap-[3px] pl-2 pr-0 tracking-tight">
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-6 w-full animate-pulse text-[16px] font-medium leading-6 tracking-tight text-muted-foreground" />
                        <Skeleton className="h-6 w-full animate-pulse text-[18px] font-semibold leading-6 tracking-tight"></Skeleton>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </section>
    </>
  );
}
