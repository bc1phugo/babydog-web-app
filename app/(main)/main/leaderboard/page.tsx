import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IWinner {
  point: number;
  username: string;
  ranking: number;
}

const rankers: Array<IWinner> = [
  {
    point: 259010999,
    username: "hugo",
    ranking: 1,
  },
  {
    point: 13278438,
    username: "elkanadi",
    ranking: 2,
  },
  {
    point: 100,
    username: "glebtma",
    ranking: 3,
  },
  {
    point: 1000,
    username: "Eslant Tory",
    ranking: 4,
  },
];

export default function LeaderboardPage() {
  const getRankingCellContent = (targetRank: number) => {
    switch (targetRank) {
      case 1: {
        return (
          <Image
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
            src="/images/image_medal_copper.png"
            width={24.25}
            height={40}
            alt="medal_gold"
          />
        );
      }
      default: {
        return `# ${targetRank}`;
      }
    }
  };

  const getInitials = (userName: string) => {
    if (!userName) return ""; // Return empty if no name is provided

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

  return (
    <>
      <div className="mt-[60px] px-[23px]">
        <section className="flex flex-col items-center text-center">
          <div className="font-semibold text-4xl">
            Telegram <br />
            Wall of Fame
          </div>
          <div
            className={cn(
              buttonVariants({ variant: "gray" }),
              "mt-[44px] w-full h-20 flex justify-start pl-5 pr-[14px]"
            )}
          >
            <Avatar className="mr-[10px]">
              <AvatarFallback className="bg-purple-600 text-background text-[18px] leading-4 tracking-tight ">
                {getInitials("Inv5521")}
              </AvatarFallback>
            </Avatar>
            <div className="text-start">
              <div>Inv5521</div>
              <div>838 BABY DOGS</div>
            </div>
            <div className="ml-auto">#25091751</div>
          </div>
        </section>
      </div>
      <section className="flex flex-col items-center mt-[80px] pb-[140px]">
        <h2 className="text-4xl font-semibold">29.4M holders</h2>
        <div className="flex flex-col gap-2 mt-10 w-full max-w-[700px] px-[23px]">
          <Table className="">
            <TableBody>
              {rankers.map((ranker) => (
                <TableRow key={ranker.username}>
                  <TableCell className="px-0 w-[40px]">
                    <Avatar>
                      <AvatarFallback className="bg-red-600 text-background text-[18px] leading-4 tracking-tight">
                        {getInitials(ranker.username)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="pl-2 pr-0 gap-[3px] tracking-tight">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground font-medium text-[16px] leading-6 tracking-tight">
                        {ranker.username}
                      </span>
                      <span className="text-[18px] leading-6 font-semibold tracking-tight">
                        + {ranker.point} BABY DOGS
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-0 text-[24px] leading-6">
                    {getRankingCellContent(ranker.ranking)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
