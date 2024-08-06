import Image from "next/image";

export default function Phase2() {
  return (
    <>
      <h1 className="text-4xl font-semibold mt-[60px]">You are amazing!</h1>
      <div className="mt-[10px] text-muted-foreground">
        Here is your BABY DOG reward
      </div>
      <div className="mt-[60px]">
        <Image
          src="/images/babydog-2.png"
          width={190}
          height={154}
          alt={"image-baby-dog"}
          className="m-auto"
        />
        <span className="text-4xl font-semibold mt-[18px]">838</span>
        <div className="text-base mt-[60px]">
          Thanks for your time on Telegram
        </div>
      </div>
    </>
  );
}
