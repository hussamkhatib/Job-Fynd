import { ReactNode } from "react";

export default interface Props {
  variant?: "primary" | "outline" | "text";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
  children: ReactNode;
}
