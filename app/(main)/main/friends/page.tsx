import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function FriendsPage() {
  return (
    <>
      <div className="mt-[60px] px-[23px] pb-[140px]">
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <div className="font-semibold ">
              <span className="block text-4xl">Invite friends</span>
              <span className="block text-3xl ">and get more BABY DOGS</span>
            </div>
            <Image
              src="/images/babydog-4.png"
              width={259}
              height={208}
              alt={"image-baby-dog"}
              className="m-auto mt-[52px]"
            />
          </div>
          <div className="mt-[57px] text-[24px] leading-7">
            Tap on the button to invite
            <br /> your friends
          </div>
        </section>
        <section className="mt-[60px] flex flex-col gap-[15px]">
          <Button
            className={cn("font-semibold text-xl leading-6 w-full")}
            variant="orange"
            size="xl"
          >
            Invite friends
          </Button>
        </section>
      </div>
    </>
  );
}
