import NavBar from "@/components/nav-bar";
import { PropsWithChildren } from "react";

export default function MainPageLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col h-screen">
      <section className="flex-1">{children}</section>
      <NavBar />
    </main>
  );
}
