"use client";

import { cn } from "@/lib/utils";
import { HomeIcon, TrophyIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLProps } from "react";

export default function NavBar() {
  const pathname = usePathname();

  const targetInfo = [
    {
      title: "Home",
      href: "/main",
      iconWithProps: (props: HTMLProps<SVGSVGElement>) => (
        <HomeIcon {...props} />
      ),
    },
    {
      title: "Leaderboard",
      href: "/main/leaderboard",
      iconWithProps: (props: HTMLProps<SVGSVGElement>) => (
        <TrophyIcon {...props} />
      ),
    },
    {
      title: "Friends",
      href: "/main/friends",
      iconWithProps: (props: HTMLProps<SVGSVGElement>) => (
        <UsersIcon {...props} />
      ),
    },
  ];

  return (
    <section className="flex justify-between bg-primary-foreground px-10 py-8 fixed inset-x-0 bottom-0">
      {targetInfo.map((target) => {
        const isActive = pathname === target.href;

        return (
          <nav key={target.href}>
            <Link
              href={target.href}
              className="flex flex-col items-center gap-2"
            >
              {target.iconWithProps({
                className: cn(
                  isActive ? "text-foreground" : "text-muted-foreground"
                ),
              })}
              <span
                className={cn(
                  isActive
                    ? "text-foreground font-bold"
                    : "text-muted-foreground",
                  "text-sm"
                )}
              >
                {target.title}
              </span>
            </Link>
          </nav>
        );
      })}
    </section>
  );
}
