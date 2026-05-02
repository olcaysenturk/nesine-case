"use client";

import { useLanguage } from "@/hooks/language/use-language";

type BetsErrorStateProps = {
  errorMessage?: string | null;
};

export function BetsErrorState({ errorMessage }: BetsErrorStateProps) {
  const { messages } = useLanguage();

  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
          !
        </span>
        <div>
          <p className="text-sm font-semibold text-rose-700">{messages.bets.fetch_error}</p>
          {errorMessage && (
            <p className="mt-1 text-xs text-rose-600">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
