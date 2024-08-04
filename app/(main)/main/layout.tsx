import NavBar from "@/components/nav-bar";
import { HomeIcon, TrophyIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function MainPageLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col h-screen">
      <section className="flex-1 pb-24">{children}</section>
      <NavBar />
    </main>
  );
}
