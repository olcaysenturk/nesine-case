"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MainSection } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBetsBulletin, loadMoreMatches } from "@/store/bets";
import { toggleSelection } from "@/store/cart";
import { toggleFavorite } from "@/store/favorites";
import { BetsTable, BetCouponPanel, BetsLoadingState, BetsErrorState } from "@/components/bets";
import { BetColumnKey, BettingMatch } from "@/types/bets";
import { useLanguage } from "@/hooks/language/use-language";
import { TicketIcon } from "@/components/icons";

export default function BetsView() {
  const dispatch = useAppDispatch();
  const { messages } = useLanguage();
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);
  const [isMobileCouponOpen, setIsMobileCouponOpen] = useState(false);

  const fetchStatus = useAppSelector((state) => state.bets.fetchStatus);
  const errorMessage = useAppSelector((state) => state.bets.errorMessage);
  const matches = useAppSelector((state) => state.bets.matches);
  const visibleCount = useAppSelector((state) => state.bets.visibleCount);
  const selectionsByMatchId = useAppSelector((state) => state.betCart.selectionsByMatchId);
  const favoriteByMatchId = useAppSelector((state) => state.favorites.byMatchId);

  const visibleMatches = useMemo(() => matches.slice(0, visibleCount), [matches, visibleCount]);
  const canLoadMore = visibleCount < matches.length;
  
  const activeSelectionByMatchId = useMemo(() => {
    const map: Record<string, BetColumnKey | null> = {};
    for (const [matchId, selection] of Object.entries(selectionsByMatchId)) {
      map[matchId] =
        selection && typeof selection === "object" && "selectedOption" in selection
          ? selection.selectedOption?.key ?? null
          : null;
    }
    return map;
  }, [selectionsByMatchId]);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchBetsBulletin());
    }
  }, [dispatch, fetchStatus]);

  const handleSelectOption = useCallback(
    (match: BettingMatch, optionKey: BetColumnKey) => {
      const selectedOption = match.options[optionKey];
      if (selectedOption.odd === null) return;

      dispatch(
        toggleSelection({
          matchId: match.id,
          matchCode: match.code,
          matchName: match.matchName,
          leagueName: match.leagueName,
          selectedOption,
        })
      );
    },
    [dispatch]
  );

  const handleToggleFavorite = useCallback(
    (matchId: string) => {
      dispatch(toggleFavorite(matchId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!canLoadMore) return;
    const target = loadMoreTriggerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry?.isIntersecting) {
          dispatch(loadMoreMatches());
        }
      },
      { root: null, rootMargin: "300px 0px", threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [canLoadMore, dispatch]);

  const content = useMemo(() => {
    if (fetchStatus === "loading") {
      return <BetsLoadingState />;
    }

    if (fetchStatus === "failed") {
      return <BetsErrorState errorMessage={errorMessage} />;
    }

    if (fetchStatus !== "succeeded") {
      return null;
    }

    return (
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1 overflow-hidden">
          <BetsTable
            matches={visibleMatches}
            activeSelectionByMatchId={activeSelectionByMatchId}
            favoriteByMatchId={favoriteByMatchId}
            onToggleFavorite={handleToggleFavorite}
            onSelectOption={handleSelectOption}
          />
          {canLoadMore && <div ref={loadMoreTriggerRef} className="h-8 w-full" aria-hidden="true" />}
        </div>

        <div className="hidden lg:block lg:sticky lg:top-4">
          <BetCouponPanel />
        </div>

        <div 
          className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity lg:hidden ${
            isMobileCouponOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMobileCouponOpen(false)}
        >
          <div 
            className={`w-full max-w-lg transform rounded-t-2xl bg-white p-4 transition-transform duration-300 ease-out ${
              isMobileCouponOpen ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-end border-b border-slate-100 pb-4">
              <button 
                onClick={() => setIsMobileCouponOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden">
              <BetCouponPanel hideHeader />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMobileCouponOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1e8608] text-white shadow-xl shadow-green-900/40 transition-transform active:scale-90 lg:hidden"
          aria-label="Open Bet Slip"
        >
          <TicketIcon className="h-6 w-6" />
          {Object.keys(selectionsByMatchId).length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#f6cf3d] text-xs font-bold text-slate-900 ring-4 ring-white">
              {Object.keys(selectionsByMatchId).length}
            </span>
          )}
        </button>
      </div>
    );
  }, [
    fetchStatus,
    errorMessage,
    visibleMatches,
    activeSelectionByMatchId,
    favoriteByMatchId,
    handleToggleFavorite,
    handleSelectOption,
    canLoadMore,
    isMobileCouponOpen,
    messages.bets.coupon_title,
    selectionsByMatchId,
  ]);

  return (
    <MainSection className="flex-1">
      <div className="w-full">
        {content}
      </div>
    </MainSection>
  );
}
