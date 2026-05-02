import { RawBetMatch } from "@/types/bets";

export const rawBetMatchMock: RawBetMatch = {
  NID: "2146483648",
  N: "PSV - AS Roma",
  C: "101",
  D: "21.05.2024",
  T: "22:00",
  DAY: "Salı",
  S: "Aktif",
  LN: "Şampiyonlar Ligi",
  OCG: {
    "1": {
      ID: "1",
      N: "Maç Sonucu",
      MBS: "4",
      OC: {
        "0": { ID: "0", O: "3.6", N: "1" },
        "1": { ID: "1", O: "3.2", N: "X" },
        "2": { ID: "2", O: "2.1", N: "2" },
      },
    },
    "5": {
      ID: "5",
      N: "Alt/Üst 2.5",
      MBS: "4",
      OC: {
        "25": { ID: "25", O: "1.8", N: "Alt" },
        "26": { ID: "26", O: "7.09", N: "Üst" },
      },
    },
  },
};
