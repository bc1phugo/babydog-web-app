import Image from "next/image";

export default function Phase2() {
  return (
    <>
      <h1 className="text-4xl font-semibold mt-[60px]">You are amazing!</h1>
      <div className="mt-[10px] text-muted-foreground">
        Here is your BABY DOG reward
      </div>
      <div className="mt-[60px] mb-[25px]">
        <Image
          src="/images/babydog-2.png"
          width={249}
          height={202}
          alt={"image-baby-dog"}
          className="m-auto"
        />
        <div className="text-4xl font-semibold mt-[14px]">838</div>
        <div className="text-base mt-[60px]">
          Thanks for your time on Telegram
        </div>
      </div>
    </>
  );
}
