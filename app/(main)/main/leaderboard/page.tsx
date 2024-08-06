import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IWinner {
  point: number;
  username: string;
  ranking: number;
}

const winners: Array<IWinner> = [
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
    username: "Esalat",
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

  return (
    <>
      <div className="mt-[60px] px-[23px]">
        <section className="flex flex-col items-center text-center">
          <div className="font-semibold text-4xl mt-[10px]">
            Telegram <br />
            Wall of Fame
          </div>
          <div
            className={cn(
              buttonVariants({ variant: "gray" }),
              "mt-[30px] w-full h-20 flex"
            )}
          >
            <div>아바타</div>
            <div>
              <div>Inv5521</div>
              <div>838 BABY DOGS</div>
            </div>
            <div>#25091751</div>
          </div>
        </section>
      </div>
      <section className="flex flex-col items-center rounded-t-[50px] bg-[#FFF8F2] mt-[80px] pb-[90px]">
        <h2 className="text-4xl font-semibold mt-[44px]">Task</h2>
        <div className="flex flex-col gap-2 mt-10 w-full max-w-[700px] px-[23px]">
          <Table className="">
            <TableBody>
              {winners.map((winner) => (
                <TableRow key={winner.username}>
                  <TableCell className="px-0 w-[30px]">
                    {winner.username}
                  </TableCell>
                  <TableCell className="pl-2 pr-0 gap-[3px] tracking-tight">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground font-medium text-[16px] leading-6">
                        {winner.username}
                      </span>
                      <span className="text-[18px] leading-6 font-semibold">
                        + {winner.point} BABY DOGS
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-0 flex justify-end text-[24px] leading-6">
                    {getRankingCellContent(winner.ranking)}
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
