import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import BabyDogPointDetail from "./components/baby-dog-point-detail";

export default function HomePage() {
  return (
    <>
      <div className="mt-[60px] px-[23px]">
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <Image
              src="/images/babydog-2.png"
              width={249}
              height={202}
              alt={"image-baby-dog"}
              className="m-auto"
            />
            <div className="font-semibold text-4xl mt-[10px]">
              838 BABY DOGS
            </div>
          </div>
          <div className="mt-[30px]">
            <div className="flex justify-between gap-[30px]">
              <div>
                <div className="text-muted-foreground leading-[22px] font-normal">
                  Rewards
                </div>
                <div className={cn("flex gap-[5px]")}>
                  <span className="text-center text-[18px] leading-[22px] font-semibold">
                    + 600
                  </span>
                  <Image
                    src="/images/three-puppies.svg"
                    alt="three-puppies-image"
                    width={36}
                    height={17}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="text-muted-foreground leading-[22px] font-normal">
                    Task
                  </div>
                  <div className={cn("flex gap-[5px]")}>
                    <span className="text-center text-[18px] leading-[22px] font-semibold">
                      + 0
                    </span>
                    <Image
                      src="/images/three-puppies.svg"
                      alt="three-puppies-image"
                      width={36}
                      height={17}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground leading-[22px] font-normal">
                  Invites
                </div>
                <div className={cn("flex gap-[5px]")}>
                  <span className="text-center text-[18px] leading-[22px] font-semibold">
                    + 0
                  </span>
                  <Image
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
      <BabyDogPointDetail />
    </>
  );
}
