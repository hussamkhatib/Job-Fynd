import Link from "next/link";
import { useRouter } from "next/router";
import React, { ElementType, FC } from "react";
import classNames from "classnames/bind";

interface Props {
  tabs: {
    name: string;
    href: string;
    icon?: ElementType;
  }[];
}

const NavTabs: FC<Props> = ({ tabs }) => {
  const router = useRouter();
  return (
    <>
      {tabs.map((tab) => {
        const isCurrent = router.asPath === tab.href;
        return (
          <Link key={tab.name} href={tab.href}>
            <a
              className={classNames(
                isCurrent
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "group inline-flex items-center border-b-2 lg:border-b-0 lg:border-l-2 py-4 px-1 text-sm font-medium"
              )}
              aria-current={isCurrent ? "page" : undefined}
            >
              {tab.icon && (
                <tab.icon
                  className={classNames(
                    isCurrent
                      ? "text-black"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 hidden h-5 w-5 ltr:mr-2 rtl:ml-2 sm:inline-block"
                  )}
                  aria-hidden="true"
                />
              )}
              <span>{tab.name}</span>
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default NavTabs;
