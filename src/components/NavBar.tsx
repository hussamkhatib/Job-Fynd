import classNames from "classnames";

import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  DocumentIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import user, { UserRole } from "../userContext";

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
    icon: UserIcon,
  },
  {
    name: "Events",
    href: "/events",
    icon: DocumentIcon,
  },
];

const NavBar = () => {
  const router = useRouter();
  const userRole = useContext(user);
  const navigation =
    userRole === UserRole.student ? studentNavigation : adminNavigation;

  return (
    <div className="flex h-screen overflow-hidden overflow-y-auto bg-white border-r border-gray-200 w-14 lg:w-56">
      <nav className="flex-1 px-2 mt-2 space-y-1 bg-white lg:mt-5">
        {navigation.map((item) => {
          const current = router.asPath.startsWith(`${item.href}`);
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={classNames(
                  current
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500 hover:bg-gray-50 hover:text-neutral-900",
                  "group flex items-center rounded-sm px-2 py-2 text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    current
                      ? "text-neutral-500"
                      : "text-neutral-400 group-hover:text-neutral-500",
                    "h-5 w-5 flex-shrink-0 mr-3"
                  )}
                  aria-hidden="true"
                />
                <span className="hidden lg:inline">{item.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavBar;
