import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

const InviteFriendsButton = dynamic(() => import("./invite-friends-button"), {
  ssr: false,
});

export default function FriendsPage() {
  return (
    <>
      <Head>
        <link rel="preload" href="/images/babydog-4.webp" as="image" />
      </Head>
      <div className="flex h-full select-none flex-col justify-between px-[23px] pb-[153px] pt-[25px]">
        <section className="mb-[20px] flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <div className="font-semibold">
              <span className="block text-4xl tracking-tight">
                Invite friends
              </span>
              <span className="block text-2xl">and get more BABY DOG</span>
            </div>
            <Image
              priority
              src="/images/babydog-4.webp"
              width={256}
              height={258}
              alt={"image-baby-dog"}
              className="m-auto mt-[10px]"
            />
          </div>
          <div className="mt-[15px] text-[24px] leading-7">
            Tap on the button to invite
            <br /> your friends
          </div>
        </section>
        <section>
          <InviteFriendsButton />
        </section>
      </div>
    </>
  );
}
