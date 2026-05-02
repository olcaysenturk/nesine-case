import {
  BettingMatch,
  RawBetMatch,
} from "@/types/bets";
import { mapRawMatchToBettingMatch } from "@/services/bets-helpers";

const BETS_API_URL = process.env.NEXT_PUBLIC_BETS_API_URL;

export const BetsService = {
  async getBets(): Promise<BettingMatch[]> {
    const response = await fetch(`${BETS_API_URL}/bets`);
    if (!response.ok) throw new Error("FETCH_BETS_ERROR");

    const rawData = (await response.json()) as RawBetMatch[];
    return rawData.map(mapRawMatchToBettingMatch);
  },
};
