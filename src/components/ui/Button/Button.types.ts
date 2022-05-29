import { ButtonHTMLAttributes, ReactNode } from "react";

export default interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
  children: ReactNode;
}
