import { MainSectionProps } from "@/types/ui";

export function MainSection({ children, className }: MainSectionProps) {
  return (
    <section
      className={`flex flex-1 w-full h-full ${className ?? ""
        }`}
    >
      {children}
    </section>
  );
}
