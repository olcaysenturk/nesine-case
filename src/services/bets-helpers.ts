import { BET_COLUMNS, BettingMatch, RawBetMarket, RawBetMatch } from "@/types/bets";

const MAIN_MARKET_ID = "1";
const HANDICAP_MARKET_ID = "2";
const HANDICAP_OUTCOME_ID = "0";
const UNKNOWN_TEXT = "-";

export function parseOdd(rawOdd?: string): number | null {
  if (!rawOdd) return null;
  const parsedOdd = Number(rawOdd.replace(",", "."));
  return Number.isFinite(parsedOdd) ? parsedOdd : null;
}

export function getMarketList(markets?: Record<string, RawBetMarket>): RawBetMarket[] {
  return markets ? Object.values(markets) : [];
}

export function findMarketById(
  markets: Record<string, RawBetMarket> | undefined,
  marketId: string
): RawBetMarket | null {
  if (!markets) return null;
  return getMarketList(markets).find((market) => market.ID === marketId) || null;
}

export function findOutcomeById(market: RawBetMarket | null, outcomeId: string) {
  if (!market?.OC) return null;
  return Object.values(market.OC).find((outcome) => outcome.ID === outcomeId) || null;
}

export function buildDefaultOptions(markets?: Record<string, RawBetMarket>) {
  return BET_COLUMNS.reduce((options, column) => {
    const market = findMarketById(markets, column.marketId);
    const outcome = findOutcomeById(market, column.outcomeId);

    options[column.key] = {
      key: column.key,
      label: column.label,
      marketId: column.marketId,
      outcomeId: column.outcomeId,
      odd: parseOdd(outcome?.O),
    };

    return options;
  }, {} as BettingMatch["options"]);
}

export function buildAdditionalMarkets(markets?: Record<string, RawBetMarket>) {
  if (!markets) return [];

  const defaultMarketIds = new Set(BET_COLUMNS.map((column) => column.marketId));

  return getMarketList(markets)
    .filter((market) => !defaultMarketIds.has(market.ID || ""))
    .map((market) => ({
      id: market.ID || UNKNOWN_TEXT,
      name: market.N || `Market ${market.ID || UNKNOWN_TEXT}`,
      outcomes: Object.values(market.OC || {}).map((outcome) => ({
        id: outcome.ID || UNKNOWN_TEXT,
        name: outcome.N || UNKNOWN_TEXT,
        odd: parseOdd(outcome.O),
      })),
    }))
    .filter((market) => market.outcomes.length > 0);
}

export function mapRawMatchToBettingMatch(rawMatch: RawBetMatch): BettingMatch {
  const markets = rawMatch.OCG;
  const mainMarket = findMarketById(markets, MAIN_MARKET_ID);
  const handicapMarket = findMarketById(markets, HANDICAP_MARKET_ID);
  const handicapOutcome = findOutcomeById(handicapMarket, HANDICAP_OUTCOME_ID);

  return {
    id: rawMatch.NID || `${rawMatch.C || "unknown"}-${rawMatch.N || "match"}`,
    code: rawMatch.C || UNKNOWN_TEXT,
    matchName: rawMatch.N || UNKNOWN_TEXT,
    leagueName: rawMatch.LN || UNKNOWN_TEXT,
    dayName: rawMatch.DAY || UNKNOWN_TEXT,
    dateText: rawMatch.D || UNKNOWN_TEXT,
    timeText: rawMatch.T || UNKNOWN_TEXT,
    status: rawMatch.S || UNKNOWN_TEXT,
    minimumBetSystem: mainMarket?.MBS || UNKNOWN_TEXT,
    handicapText: handicapOutcome?.N || UNKNOWN_TEXT,
    extraMarketCount: getMarketList(markets).length,
    additionalMarkets: buildAdditionalMarkets(markets),
    options: buildDefaultOptions(markets),
  };
}
