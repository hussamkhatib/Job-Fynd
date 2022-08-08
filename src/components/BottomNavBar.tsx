import classNames from "classnames";

import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  OfficeBuildingIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

const studentNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserIcon,
  },
  {
    name: "Events",
    href: "/events",
    icon: CalendarIcon,
  },
];

const adminNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Students",
    href: "/students",
    icon: UserIcon,
  },
  {
    name: "Companies",
    href: "/companies",
    icon: OfficeBuildingIcon,
  },
  {
    name: "Events",
    href: "/events",
    icon: CalendarIcon,
  },
];

const BottomNavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const navigation =
    session?.user.role === Role.student ? studentNavigation : adminNavigation;
  return (
    <nav className="fixed bottom-0 z-30 flex w-full bg-white shadow md:hidden">
      {navigation.map((item, itemIdx) => {
        const current = router.asPath.startsWith(`${item.href}`);

        return (
          <Link key={item.name} href={item.href}>
            <a
              className={classNames(
                current
                  ? "text-gray-900"
                  : "text-neutral-400 hover:text-gray-700",
                itemIdx === 0 ? "rounded-l-lg" : "",
                itemIdx === navigation.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-2 text-center text-xs font-medium hover:bg-gray-50 focus:z-10 sm:text-sm"
              )}
              aria-current={current ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  current
                    ? "text-gray-900"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mx-auto mb-1 block h-5 w-5 flex-shrink-0 text-center"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </a>
          </Link>
        );
      })}
      <Link href="/api/auth/signout">
        <a className="text-neutral-400 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-2 text-center text-xs font-medium hover:bg-gray-50 focus:z-10 sm:text-sm">
          <LogoutIcon
            className="text-gray-400 group-hover:text-gray-500 x-auto mb-1 block h-5 w-5 flex-shrink-0 text-center mx-auto"
            aria-hidden
          />
          <span className="truncate">Sign Out</span>
        </a>
      </Link>
    </nav>
  );
};

export default BottomNavBar;
