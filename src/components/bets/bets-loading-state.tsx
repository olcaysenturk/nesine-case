"use client";

import { useLanguage } from "@/hooks/language/use-language";

export function BetsLoadingState() {
  const { messages } = useLanguage();

  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 h-full min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-blue-500" />
        <p className="text-sm font-medium text-slate-500">{messages.bets.loading}</p>
      </div>
    </div>
  );
}
