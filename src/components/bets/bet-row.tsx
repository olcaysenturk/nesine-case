"use client";

import { memo } from "react";
import { BetColumnKey, BettingMatch } from "@/types/bets";
import { Button } from "@/components/ui";
import { useLanguage } from "@/hooks/language/use-language";

type BetRowProps = {
  match: BettingMatch;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
  isExpanded: boolean;
  onToggleExpand: (matchId: string) => void;
  activeOptionKey: BetColumnKey | null;
  onSelectOption: (match: BettingMatch, optionKey: BetColumnKey) => void;
};

const rowBaseCellClass = "px-1 py-1 text-[10px] border-b border-slate-100 whitespace-nowrap";

function BetRowComponent({
  match,
  isFavorite,
  onToggleFavorite,
  isExpanded,
  onToggleExpand,
  activeOptionKey,
  onSelectOption,
}: BetRowProps) {
  const { messages } = useLanguage();
  const [homeTeam, awayTeam] = match.matchName.split(" - ");

  return (
    <tr className="bg-white hover:bg-slate-50 transition-colors">
      <td className={`${rowBaseCellClass} text-center`}>
        <button
          type="button"
          onClick={() => onToggleFavorite(match.id)}
          aria-label={isFavorite ? messages.bets.favorite_remove : messages.bets.favorite_add}
          title={isFavorite ? messages.bets.favorite_remove : messages.bets.favorite_add}
          className={`cursor-pointer ${isFavorite ? "text-amber-500" : "text-slate-500"}`}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </td>
      <td className={`${rowBaseCellClass} text-center font-semibold`}>{match.timeText}</td>
      <td className={rowBaseCellClass}>
        <div className="truncate text-[10px] font-semibold text-slate-900">{homeTeam || match.matchName}</div>
        <div className="truncate text-[10px] font-semibold text-slate-900">{awayTeam || ""}</div>
      </td>
      <td className={`${rowBaseCellClass} text-center font-semibold`}>
        <div className="flex flex-col items-center leading-5">
          <span>0</span>
          <span>0</span>
        </div>
      </td>
      <td className={rowBaseCellClass}>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-red-600 px-1 text-[10px] font-bold text-white">
          {match.minimumBetSystem}
        </span>
      </td>
      {(["homeWinMain", "drawMain", "awayWinMain", "under25", "over25"] as BetColumnKey[]).map((key) => {
        const option = match.options[key];
        const isSelected = activeOptionKey === key;

        return (
          <td key={key} className={rowBaseCellClass}>
            <Button
              type="button"
              variant={isSelected ? "primary" : "secondary"}
              size="sm"
              className="h-6 w-full min-w-0 px-0 text-[10px]"
              onClick={() => onSelectOption(match, key)}
              disabled={option.odd === null}
              title={option.label}
            >
              {option.odd !== null ? option.odd.toFixed(2) : "-"}
            </Button>
          </td>
        );
      })}
      <td className={`${rowBaseCellClass} text-center font-semibold text-slate-700`}>{match.handicapText}</td>
      {(
        [
          "homeWinHnd",
          "drawHnd",
          "awayWinHnd",
          "oneX",
          "oneTwo",
          "xTwo",
          "bothTeamsScoreYes",
          "bothTeamsScoreNo",
        ] as BetColumnKey[]
      ).map((key) => {
        const option = match.options[key];
        const isSelected = activeOptionKey === key;

        return (
          <td key={key} className={rowBaseCellClass}>
            <Button
              type="button"
              variant={isSelected ? "primary" : "secondary"}
              size="sm"
              className="h-6 w-full min-w-0 px-0 text-[10px]"
              onClick={() => onSelectOption(match, key)}
              disabled={option.odd === null}
              title={option.label}
            >
              {option.odd !== null ? option.odd.toFixed(2) : "-"}
            </Button>
          </td>
        );
      })}
      <td className={`${rowBaseCellClass} text-center font-bold text-slate-700`}>
        {match.extraMarketCount > 0 ? (
          <button
            type="button"
            className="w-full cursor-pointer"
            onClick={() => onToggleExpand(match.id)}
            aria-label={messages.bets.extra_markets_toggle}
            title={messages.bets.extra_markets_toggle}
          >
            {isExpanded ? "−" : "+"}
          </button>
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
}

export const BetRow = memo(BetRowComponent);
