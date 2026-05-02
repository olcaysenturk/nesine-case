"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { TrashIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearSelections, removeSelectionByMatchId } from "@/store/cart";
import { BetCouponEmpty } from "@/components/bets/bet-coupon-empty";
import { useLanguage } from "@/hooks/language/use-language";
import type { BetSlipSelection } from "@/types/bets";

function isValidSelection(value: unknown): value is BetSlipSelection {
  if (!value || typeof value !== "object") return false;
  const selection = value as Partial<BetSlipSelection>;
  return (
    typeof selection.matchId === "string" &&
    typeof selection.matchName === "string" &&
    typeof selection.leagueName === "string" &&
    typeof selection.selectedOption === "object" &&
    selection.selectedOption !== null &&
    typeof selection.selectedOption.key === "string"
  );
}

export function BetCouponPanel({ hideHeader = false }: { hideHeader?: boolean }) {
  const { messages } = useLanguage();
  const dispatch = useAppDispatch();
  const selectionsByMatchId = useAppSelector((state) => state.betCart.selectionsByMatchId);
  const selections = useMemo(
    () => Object.values(selectionsByMatchId).filter(isValidSelection),
    [selectionsByMatchId]
  );
  const [couponAmount, setCouponAmount] = useState<number>(2);
  const [couponCount, setCouponCount] = useState<number>(1);
  const couponAmountOptions = [2, 5, 10, 20, 50, 100];
  const couponCountOptions = [1, 2, 3, 5, 10];
  const totalOdd = useMemo(
    () => selections.reduce((sum, selection) => sum + (selection.selectedOption.odd || 0), 0),
    [selections]
  );
  const maxWinnings = useMemo(
    () => totalOdd * couponAmount * couponCount,
    [totalOdd, couponAmount, couponCount]
  );

  return (
    <aside className={`w-full lg:w-[225px] shrink-0 overflow-hidden ${hideHeader ? "" : "rounded-xl border-2 border-[#2d6574] bg-white"}`}>
      {!hideHeader && (
        <div className="flex items-center justify-between bg-[#1f4d58] px-2 py-2">
          <h3 className="text-[11px] font-extrabold tracking-wide text-white">{messages.bets.coupon_title}</h3>
          <span className="rounded-full bg-[#f6cf3d] px-2 py-0.5 text-[10px] font-bold text-slate-900">
            {selections.length}
          </span>
        </div>
      )}
      <div className="max-h-[420px] overflow-y-auto">
        {selections.length === 0 && <BetCouponEmpty />}
        {selections.map((selection, index) => (
          <div key={selection.matchId} className="border-b border-slate-200 px-2 py-2">
            <div className="mb-1 flex items-center justify-between gap-1">
              <p className="truncate text-[11px] font-bold text-slate-800">{selection.matchName}</p>
              <button
                type="button"
                className="text-[10px] font-semibold text-slate-400 hover:text-rose-600"
                onClick={() => dispatch(removeSelectionByMatchId(selection.matchId))}
              >
                X
              </button>
            </div>
            <p className="mb-1 text-[10px] text-slate-500">{selection.leagueName}</p>
            <div className="flex items-center justify-between text-[10px]">
              <span className="rounded bg-[#ef7f2d] px-1.5 py-0.5 font-bold text-white">{index + 1}</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-700">{messages.bets.match_result}</span>
              <span className="rounded bg-[#617c85] px-2 py-0.5 font-bold text-white">
                {selection.selectedOption.label}
              </span>
              <span className="font-bold text-slate-900">
                {(selection.selectedOption.odd || 0).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selections.length > 0 && (
        <div className="space-y-2 border-t border-slate-200 bg-slate-100 p-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-600">{messages.bets.max_odd}</span>
            <span className="text-lg font-black text-[#33a6c9]">{totalOdd.toFixed(2)}</span>
          </div>
          <div className="grid gap-1 rounded border border-slate-200 bg-white p-2">
            <label className="flex items-center justify-between gap-2 text-[10px]">
              <span className="font-semibold text-slate-600">{messages.bets.coupon_amount}</span>
              <select
                value={couponAmount}
                onChange={(event) => setCouponAmount(Number(event.target.value))}
                className="h-7 w-24 rounded border border-slate-300 px-2 text-right text-[10px] font-semibold text-slate-800 outline-none focus:border-[#33a6c9]"
              >
                {couponAmountOptions.map((amount) => (
                  <option key={amount} value={amount}>
                    {amount} {messages.bets.amount_unit}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center justify-between gap-2 text-[10px]">
              <span className="font-semibold text-slate-600">{messages.bets.coupon_count}</span>
              <select
                value={couponCount}
                onChange={(event) => setCouponCount(Number(event.target.value))}
                className="h-7 w-24 rounded border border-slate-300 px-2 text-right text-[10px] font-semibold text-slate-800 outline-none focus:border-[#33a6c9]"
              >
                {couponCountOptions.map((count) => (
                  <option key={count} value={count}>
                    {count} {messages.bets.count_unit}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-600">{messages.bets.max_winnings}</span>
            <span className="text-lg font-black text-[#33a6c9]">{maxWinnings.toFixed(2)} {messages.bets.amount_unit}</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="clear-slip"
              title="clear-slip"
              className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => dispatch(clearSelections())}
              disabled={selections.length === 0}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
            <Button
              type="button"
              variant="primary"
              className="h-[30px] flex-[2] bg-[#1e8608] px-2 text-[10px] font-semibold hover:bg-[#176b06] focus-visible:ring-[#1e8608]"
            >
              {messages.bets.play_now}
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
