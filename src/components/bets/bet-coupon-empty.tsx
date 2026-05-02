"use client";

import { useLanguage } from "@/hooks/language/use-language";

export function BetCouponEmpty() {
  const { messages } = useLanguage();

  return (
    <div className="px-2 py-4 text-center">
      <p className="text-[11px] font-semibold text-slate-700">{messages.bets.empty_coupon_title}</p>
      {messages.bets.empty_coupon_subtitle ? (
        <p className="mt-0.5 text-[10px] text-slate-500">{messages.bets.empty_coupon_subtitle}</p>
      ) : null}
    </div>
  );
}
