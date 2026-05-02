"use client";

import { useMemo } from "react";
import { HeaderDropdown } from "@/components/ui";
import { useAppSelector } from "@/store/hooks";
import { useLanguage } from "@/hooks/language/use-language";

const triggerClassName =
  "flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-amber-500 focus:border-slate-300 focus:bg-slate-50 focus:outline-none";

export function FavoritesMenu() {
  const { messages } = useLanguage();
  const favoritesByMatchId = useAppSelector((state) => state.favorites.byMatchId);
  const matches = useAppSelector((state) => state.bets.matches);
  const favoriteMatches = useMemo(
    () => matches.filter((match) => favoritesByMatchId[match.id]),
    [matches, favoritesByMatchId]
  );

  const favoriteMatchIds = Object.keys(favoritesByMatchId);

  return (
    <HeaderDropdown
      buttonClassName={triggerClassName}
      buttonContent={<span className="text-sm leading-none">★</span>}
      panelClassName="min-w-[260px] max-w-[300px]"
    >
      <div className="border-b border-slate-100 px-3 py-2">
        <p className="text-xs font-semibold text-slate-900">{messages.bets.favorites_title}</p>
      </div>

      <div className="max-h-72 overflow-y-auto py-1">
        {favoriteMatchIds.length === 0 && (
          <div className="px-3 py-2 text-xs text-slate-500">{messages.bets.favorites_empty}</div>
        )}

        {favoriteMatches.map((match) => (
          <div key={match.id} className="mx-1 mb-1 rounded-lg border border-slate-100 px-2 py-1.5">
            <div className="text-xs font-semibold text-slate-900">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate">{match.matchName.split(" - ")[0] || match.matchName}</p>
                <span className="shrink-0">0</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate">{match.matchName.split(" - ")[1] || "-"}</p>
                <span className="shrink-0">0</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              {match.timeText} • {match.leagueName}
            </p>
          </div>
        ))}
      </div>
    </HeaderDropdown>
  );
}
