import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { FC } from "react";
import classNames from "classnames";
import { UserCircleIcon } from "@heroicons/react/solid";
import Props from "./Avatar.types";

const Avatar: FC<Props> = ({ src, alt, name, size }) => {
  return (
    <AvatarPrimitive.Root
      className={classNames(
        "inline-flex items-center justify-center  overflow-hidden align-middle rounded-full select-none",
        size && `h-${size} w-${size}`
      )}
    >
      <AvatarPrimitive.Image
        src={src ?? undefined}
        alt={alt}
        className="object-cover w-full h-full"
      />
      <AvatarPrimitive.Fallback
        delayMs={600}
        className="flex items-center justify-center w-full h-full font-medium text-white bg-primary"
      >
        {name ? getFirstLetterofFirstAndMiddleName(name) : <UserCircleIcon />}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

export default Avatar;

const getFirstLetterofFirstAndMiddleName = (str: string) =>
  str
    .split(" ")
    .slice(0, 2)
    .map((a) => a[0])
    .join("");
