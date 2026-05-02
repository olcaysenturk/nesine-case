"use client";

import { useState, useCallback, useMemo } from "react";
import { Fragment } from "react";
import { BetColumnKey, BettingMatch } from "@/types/bets";
import { BetRow } from "@/components/bets/bet-row";
import { useLanguage } from "@/hooks/language/use-language";
import { getGroupHeaderLabels } from "./bets.utils";

type BetsTableProps = {
  matches: BettingMatch[];
  activeSelectionByMatchId: Record<string, BetColumnKey | null>;
  favoriteByMatchId: Record<string, boolean>;
  onToggleFavorite: (matchId: string) => void;
  onSelectOption: (match: BettingMatch, optionKey: BetColumnKey) => void;
};

export function BetsTable({
  matches,
  activeSelectionByMatchId,
  favoriteByMatchId,
  onToggleFavorite,
  onSelectOption,
}: BetsTableProps) {
  const { messages } = useLanguage();
  const [expandedMatchIds, setExpandedMatchIds] = useState<Record<string, boolean>>({});
  const totalColumnCount = 20;
  const groupHeaderLabels = useMemo(() => getGroupHeaderLabels(messages.bets), [messages.bets]);

  const handleToggleExpand = useCallback((matchId: string) => {
    setExpandedMatchIds((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <colgroup>
            <col className="w-8" />
            <col className="w-10" />
            <col className="w-16" />
            <col className="w-10" />
            <col className="w-10" />
            {Array.from({ length: 14 }).map((_, index) => (
              <col key={index} className="w-10" />
            ))}
            <col className="w-10" />
          </colgroup>
          <tbody>
            {matches.map((match, index) => {
              const previousLeagueName = index > 0 ? matches[index - 1].leagueName : null;
              const shouldRenderLeagueHeader = previousLeagueName !== match.leagueName;

              return (
                <Fragment key={match.id}>
                  {shouldRenderLeagueHeader && (
                    <tr className="bg-[#88a2ab] text-white">
                      <td colSpan={totalColumnCount} className="px-2 py-1.5 text-[11px] font-extrabold">
                        <div className="flex justify-between w-70">
                          <span>{match.leagueName}</span>
                          <span>{match.dayName}</span>
                          <span>{match.dateText}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {shouldRenderLeagueHeader && (
                    <tr className="bg-[#7c9aa3] text-white">
                      <td className="px-1 py-1 text-center text-[10px] font-semibold" />
                      {groupHeaderLabels.map((label, idx) => (
                        <td
                          key={`${match.id}-${label}-${idx}`}
                          className="px-1 py-1 text-center text-[10px] font-semibold"
                        >
                          {label}
                        </td>
                      ))}
                      <td className="px-1 py-1 text-center text-[10px] font-semibold">+</td>
                    </tr>
                  )}
                  <BetRow
                    match={match}
                    isFavorite={Boolean(favoriteByMatchId[match.id])}
                    onToggleFavorite={onToggleFavorite}
                    isExpanded={Boolean(expandedMatchIds[match.id])}
                    onToggleExpand={handleToggleExpand}
                    activeOptionKey={activeSelectionByMatchId[match.id] || null}
                    onSelectOption={onSelectOption}
                  />
                  {expandedMatchIds[match.id] && (
                    <tr className="bg-slate-50">
                      <td colSpan={totalColumnCount} className="px-2 py-2 text-[10px] text-slate-700">
                        {match.additionalMarkets.length === 0 ? (
                          <div className="rounded border border-slate-200 bg-white px-2 py-1 text-slate-500">
                            {messages.bets.no_extra_markets}
                          </div>
                        ) : (
                          <div className="grid gap-1">
                            {match.additionalMarkets.map((market) => (
                              <div key={market.id} className="rounded border border-slate-200 bg-white px-2 py-1">
                                <p className="font-semibold text-slate-900">{market.name}</p>
                                <div className="mt-1 flex flex-wrap gap-2">
                                  {market.outcomes.map((outcome) => (
                                    <span
                                      key={`${market.id}-${outcome.id}`}
                                      className="rounded border border-slate-200 px-1.5 py-0.5"
                                    >
                                      {outcome.name}: {outcome.odd !== null ? outcome.odd.toFixed(2) : "-"}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
