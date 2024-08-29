import Head from "next/head";
import Image from "next/image";

interface Phase2Props {
  dogPoint: number;
}

export default function Phase2({ dogPoint }: Phase2Props) {
  return (
    <>
      <Head>
        <link rel="preload" href="/images/babydog-2-confetti.webp" as="image" />
      </Head>
      <Image
        priority
        src="/images/babydog-2-confetti.webp"
        width={422}
        height={444}
        alt={"image-baby-dog"}
        className="absolute left-1/2 top-[-63px] -z-10 m-auto min-h-[444px] min-w-[422px] -translate-x-1/2"
      />
      <h1 className="mt-[20px] text-4xl font-semibold">You are amazing!</h1>
      <div className="mt-[5px] tracking-tight text-muted-foreground">
        Here is your BABY DOGS reward
      </div>
      <div className="mb-[10px] mt-[276px]">
        <div className="mt-[14px] text-4xl font-semibold">{dogPoint ?? 0}</div>
        <div className="mt-[20px] text-base tracking-tight">
          Thanks for your time on Telegram
        </div>
      </div>
    </>
  );
}
