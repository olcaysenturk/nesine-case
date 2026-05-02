import { IconProps } from "@/types/common";

export function TicketIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 18 4.5H5.25a2.25 2.25 0 0 0-2.25 2.25v8.25a2.25 2.25 0 0 0 2.25 2.25H6.75a2.25 2.25 0 0 1 2.25 2.25v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125v-.375a2.25 2.25 0 0 1 2.25-2.25Z"
      />
    </svg>
  );
}
