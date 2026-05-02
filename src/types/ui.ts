import React from "react";

export type ButtonVariant = "primary" | "secondary" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface MainSectionProps {
  children: React.ReactNode;
  className?: string;
}

export interface HeaderDropdownProps {
  buttonClassName: string;
  buttonContent: React.ReactNode;
  children: React.ReactNode;
  panelClassName?: string;
}
