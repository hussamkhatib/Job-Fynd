import { InputHTMLAttributes } from "react";

export type InputRef = HTMLInputElement;

export default interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  className?: string;
}
