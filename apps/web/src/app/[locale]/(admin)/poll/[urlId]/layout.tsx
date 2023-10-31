"use client";
import { PollLayout } from "@/components/layouts/poll-layout";

export default function Layout({ children }: React.PropsWithChildren) {
  return <PollLayout>{children}</PollLayout>;
}
