"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/language/use-language";

export function Logo() {
  const { messages } = useLanguage();

  return (
    <Link href="/bets" className="flex items-center transition hover:opacity-80">
      <Image
        src="/assets/images/nesine-logo.svg"
        alt={messages.header.logo.primary + " " + messages.header.logo.secondary}
        width={112}
        height={28}
        priority
        className="h-7 w-auto object-contain"
        style={{ width: "auto" }}
      />
    </Link>
  );
}
