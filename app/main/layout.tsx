import { HomeIcon, TrophyIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function MainPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col">
      <section className="flex-1">{children}</section>
      <section className="flex">
        <nav>
          <HomeIcon />
          <Link href="/main">Home</Link>
        </nav>
        <nav>
          <TrophyIcon />
          <Link href="/main/leaderboard">Leaderboard</Link>
        </nav>
        <nav>
          <UsersIcon />
          <Link href="/main/friends">Friends</Link>
        </nav>
      </section>
    </div>
  );
}
