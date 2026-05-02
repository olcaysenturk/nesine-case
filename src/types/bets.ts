export type BetColumnKey =
  | "homeWinMain"
  | "drawMain"
  | "awayWinMain"
  | "under25"
  | "over25"
  | "homeWinHnd"
  | "drawHnd"
  | "awayWinHnd"
  | "oneX"
  | "oneTwo"
  | "xTwo"
  | "bothTeamsScoreYes"
  | "bothTeamsScoreNo";

export interface BetColumn {
  key: BetColumnKey;
  label: string;
  marketId: string;
  outcomeId: string;
}

export interface BetOption {
  key: BetColumnKey;
  label: string;
  marketId: string;
  outcomeId: string;
  odd: number | null;
}

export interface AdditionalBetOutcome {
  id: string;
  name: string;
  odd: number | null;
}

export interface AdditionalBetMarket {
  id: string;
  name: string;
  outcomes: AdditionalBetOutcome[];
}

export interface BettingMatch {
  id: string;
  code: string;
  matchName: string;
  leagueName: string;
  dayName: string;
  dateText: string;
  timeText: string;
  status: string;
  minimumBetSystem: string;
  handicapText: string;
  extraMarketCount: number;
  additionalMarkets: AdditionalBetMarket[];
  options: Record<BetColumnKey, BetOption>;
}

export interface BetSlipSelection {
  matchId: string;
  matchCode: string;
  matchName: string;
  leagueName: string;
  selectedOption: BetOption;
}

export interface RawBetOutcome {
  ID?: string;
  O?: string;
  N?: string;
  MBS?: string;
  [key: string]: unknown;
}

export interface RawBetMarket {
  ID?: string;
  N?: string;
  MBS?: string;
  OC?: Record<string, RawBetOutcome>;
  [key: string]: unknown;
}

export interface RawBetMatch {
  C?: string;
  N?: string;
  NID?: string;
  D?: string;
  T?: string;
  DAY?: string;
  S?: string;
  LN?: string;
  OCG?: Record<string, RawBetMarket>;
  [key: string]: unknown;
}

export const BET_COLUMNS: BetColumn[] = [
  { key: "homeWinMain", label: "1", marketId: "1", outcomeId: "0" },
  { key: "drawMain", label: "X", marketId: "1", outcomeId: "1" },
  { key: "awayWinMain", label: "2", marketId: "1", outcomeId: "2" },
  { key: "under25", label: "Alt", marketId: "5", outcomeId: "25" },
  { key: "over25", label: "Üst", marketId: "5", outcomeId: "26" },
  { key: "homeWinHnd", label: "1", marketId: "2", outcomeId: "0" },
  { key: "drawHnd", label: "X", marketId: "2", outcomeId: "1" },
  { key: "awayWinHnd", label: "2", marketId: "2", outcomeId: "2" },
  { key: "oneX", label: "1-X", marketId: "2", outcomeId: "3" },
  { key: "oneTwo", label: "1-2", marketId: "2", outcomeId: "4" },
  { key: "xTwo", label: "X-2", marketId: "2", outcomeId: "5" },
  { key: "bothTeamsScoreYes", label: "Var", marketId: "3", outcomeId: "0" },
  { key: "bothTeamsScoreNo", label: "Yok", marketId: "3", outcomeId: "1" },
];
