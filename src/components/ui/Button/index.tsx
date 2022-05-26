import classNames from "classnames";
import { FC } from "react";
import Props from "./Button.types";

const ButtonSize = {
  xs: "px-2 h-6 leading-5 text-xs",
  sm: " px-3 h-8 leading-5 text-sm",
  md: "px-4 h-10 leading-6 text-sm",
  lg: "px-6 h-12 text-base",
};

const ButtonVariants = {
  primary: "text-white bg-neutral-900",
  text: "text-nuetral-900",
  outline: "border-2 border-neutral-900",
};

const Button: FC<Props> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  ...props
}) => {
  const sizeStyles = ButtonSize[size];
  const variantStyles = ButtonVariants[variant];
  return (
    <button
      className={classNames(
        "inline-flex justify-center items-center font-semibold shadow-sm focus:outline-none",
        sizeStyles,
        variantStyles,
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
