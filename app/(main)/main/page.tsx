import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import BabyDogPointDetail from "./components/baby-dog-point-detail";

export default function HomePage() {
  return (
    <>
      <div className="mt-[60px] px-[23px]">
        <section className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <Image
              src="/images/babydog-2.png"
              width={249}
              height={202}
              alt={"image-baby-dog"}
              className="m-auto"
            />
            <div className="text-3xl font-semibold mt-[10px]">838 CATS</div>
          </div>
          <div className="mt-[30px]">
            <div className="flex justify-between gap-4">
              <div>
                <div className="text-muted-foreground">Rewards</div>
                <span className="text-center">+ 600</span>
              </div>
              <div>
                <div className="text-muted-foreground">Tasks</div>
                <span className="text-center">+ 0</span>
              </div>
              <div>
                <div className="text-muted-foreground">Invites</div>
                <span className="text-center">+ 0</span>
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
              buttonVariants({ variant: "orange", size: "xl" }),
              "font-semibold text-xl leading-6 w-full"
            )}
          >
            Follow Baby dog X.COM
          </Link>
        </section>
      </div>
      <BabyDogPointDetail />
    </>
  );
}
