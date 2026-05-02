"use client";

import { useAppSelector } from "@/store/hooks";
import { useLanguage } from "@/hooks/language/use-language";
import { HeaderDropdown } from "@/components/ui";
import { TicketIcon } from "@/components/icons";

const triggerClassName =
  "relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-[#1e8608]/20 bg-white text-[#1e8608] shadow-sm transition hover:border-[#1e8608]/40 hover:bg-green-50 focus:border-[#1e8608] focus:outline-none";

export function CouponMenu() {
  const { messages } = useLanguage();
  const selectionsByMatchId = useAppSelector((state) => state.betCart.selectionsByMatchId);
  const selections = Object.values(selectionsByMatchId);

  return (
    <HeaderDropdown
      buttonClassName={triggerClassName}
      buttonContent={
        <>
          <TicketIcon className="h-4 w-4" />
          {selections.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1e8608] text-[9px] font-bold text-white ring-2 ring-[#fc0]">
              {selections.length}
            </span>
          )}
        </>
      }
      panelClassName="min-w-[260px] max-w-[300px]"
    >
      <div className="border-b border-slate-100 px-3 py-2">
        <p className="text-xs font-semibold text-slate-900">{messages.bets.coupon_title}</p>
      </div>

      <div className="max-h-72 overflow-y-auto py-1">
        {selections.length === 0 && (
          <div className="px-3 py-2 text-xs text-slate-500">{messages.bets.empty_coupon_title}</div>
        )}

        {selections.map((selection) => (
          <div key={selection.matchId} className="mx-1 mb-1 rounded-lg border border-slate-100 px-2 py-1.5">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-xs font-semibold text-slate-900">{selection.matchName}</p>
              <span className="shrink-0 text-xs font-bold text-slate-900">
                {selection.selectedOption.odd?.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>{selection.selectedOption.label}</span>
              <span>{selection.leagueName}</span>
            </div>
          </div>
        ))}
      </div>
    </HeaderDropdown>
  );
}
