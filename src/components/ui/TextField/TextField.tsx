import classNames from "classnames";
import { forwardRef } from "react";
import Props, { TextFieldRef } from "./TextField.types";

const TextField = forwardRef<TextFieldRef, Props>(
  (
    {
      fullWidth = false,
      className,
      type = "text",
      id,
      label,
      defaultValue,
      name,
      required = false,
      disabled = false,
    },
    ref
  ) => {
    return (
      <label
        htmlFor={id}
        className="relative flex flex-col justify-center h-full border-dashed cursor-pointer"
      >
        <span>{label}</span>
        <input
          name={name}
          ref={ref}
          type={type}
          defaultValue={defaultValue}
          className={classNames(
            fullWidth && "w-full",
            "block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
            className
          )}
          required={required}
          disabled={disabled}
        />
      </label>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
