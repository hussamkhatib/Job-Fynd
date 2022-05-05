import { FC } from "react";
import Image from "next/image";
import { getFirstLetterofFirstAndMiddleName } from "../../../helper";
import classNames from "classnames";
import { UserCircleIcon } from "@heroicons/react/solid";
import Props from "./Avatar.types";

const Avatar: FC<Props> = ({ src, alt, size, variant = "circular", name }) => {
  const variantClass =
    variant === "circular"
      ? "rounded-full"
      : variant === "rounded"
      ? "rounded"
      : "";

  return (
    <div style={{ height: `${size || 40}px`, width: `${size || 40}px` }}>
      {src ? (
        <Image
          className={variantClass}
          src={src}
          alt={alt}
          width={size || 40}
          height={size || 40}
        />
      ) : (
        <span
          className={classNames(
            variantClass,
            "bg-black text-white inline-flex items-center justify-center h-full w-full "
          )}
        >
          {name ? getFirstLetterofFirstAndMiddleName(name) : <UserCircleIcon />}
        </span>
      )}
    </div>
  );
};

export default Avatar;
