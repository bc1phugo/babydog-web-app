import { HomeIcon, TrophyIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function MainPageLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col min-h-dvh">
      <section className="flex-1">{children}</section>
      <section className="flex justify-between px-10 py-4 inset-x-0 bottom-0">
        <nav>
          <Link href="/main" className="flex flex-col items-center gap-2">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </nav>
        <nav>
          <Link
            href="/main/leaderboard"
            className="flex flex-col items-center gap-2"
          >
            <TrophyIcon />
            Leaderboard
          </Link>
        </nav>
        <nav>
          <Link
            href="/main/friends"
            className="flex flex-col items-center gap-2"
          >
            <UsersIcon />
            <span>Friends</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}
