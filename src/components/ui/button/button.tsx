
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types/ui";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        {
          "bg-[#1e8608] text-white hover:bg-[#176b06] focus-visible:ring-[#1e8608]": variant === "primary",
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600": variant === "destructive",
          "h-8 px-3 text-xs": size === "sm",
          "h-10 px-4 py-2 text-sm": size === "md",
          "h-12 px-8 text-base": size === "lg",
          "h-9 w-9 p-0": size === "icon",
        },
        className
      )}
      {...props}
    />
  );
}
