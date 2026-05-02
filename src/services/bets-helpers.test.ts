import { mapRawMatchToBettingMatch } from "@/services/bets-helpers";
import { rawBetMatchMock } from "@/mock-data/raw-bet-match";

describe("bets-helpers", () => {
  it("maps raw match data into betting match model", () => {
    const mappedMatch = mapRawMatchToBettingMatch(rawBetMatchMock);

    expect(mappedMatch.id).toBe("2146483648");
    expect(mappedMatch.matchName).toBe("PSV - AS Roma");
    expect(mappedMatch.minimumBetSystem).toBe("4");
    expect(mappedMatch.options.homeWinMain.odd).toBe(3.6);
    expect(mappedMatch.options.over25.odd).toBe(7.09);
    expect(mappedMatch.additionalMarkets.length).toBe(0);
  });
});
