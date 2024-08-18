import Head from "next/head";
import Image from "next/image";

interface Phase2Props {
  dogPoint: number;
}

export default function Phase2({ dogPoint }: Phase2Props) {
  return (
    <>
      <Head>
        <link rel="preload" href="/images/babydog-2.png" as="image" />
      </Head>
      <h1 className="text-4xl font-semibold mt-[20px]">You are amazing!</h1>
      <div className="mt-[5px] text-muted-foreground tracking-tight">
        Here is your DOGS reward
      </div>
      <div className="mt-[20px] mb-[10px]">
        <Image
          priority
          src="/images/babydog-2.png"
          width={249}
          height={202}
          alt={"image-baby-dog"}
          className="m-auto"
        />
        <div className="text-4xl font-semibold mt-[14px]">{dogPoint ?? 0}</div>
        <div className="text-base mt-[40px] tracking-tight">
          Thanks for your time on Telegram
        </div>
      </div>
    </>
  );
}
