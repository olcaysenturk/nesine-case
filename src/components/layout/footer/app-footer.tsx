"use client";

import Image from "next/image";
import { useLanguage } from "@/hooks/language";

export function AppFooter() {
  const { messages } = useLanguage();

  return (
    <footer className="border-t border-slate-800 bg-[#000]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-sm text-slate-200">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/images/footer-nsn-logo.svg"
            alt={messages.footer.brand}
            width={96}
            height={24}
            className="h-6 w-auto object-contain"
            style={{ width: "auto" }}
          />
        </div>
        <span>{messages.footer.copyright}</span>
      </div>
    </footer>
  );
}
