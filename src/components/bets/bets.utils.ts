import { BetsMessages } from "@/types/i18n";

export const getGroupHeaderLabels = (betsMessages: BetsMessages): string[] => [
  "",
  "",
  betsMessages.score,
  betsMessages.mbs,
  "1",
  "X",
  "2",
  betsMessages.under_label,
  betsMessages.over_label,
  betsMessages.handicap_label,
  "1",
  "X",
  "2",
  "1-X",
  "1-2",
  "X-2",
  betsMessages.yes_label,
  betsMessages.no_label,
];
