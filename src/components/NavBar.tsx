import NavTabs from "./NavTabs"
import { HomeIcon, CalendarIcon, UserIcon, DocumentIcon } from "@heroicons/react/solid";

const tabs = [
    {
        name: "Home",
        href: "/home",
        icon: HomeIcon,
    },
    {
        name: "Events",
        href: "/events",
        icon: CalendarIcon,
    },
    {
        name: "Profile",
        href: "/profile",
        icon: UserIcon,
    },
    {
        name: "Record",
        href: "/record",
        icon: DocumentIcon,
    },
];


const NavBar = () => {
    return (
        <nav className="flex justify-evenly lg:flex-col fixed bottom-0 lg:static w-full">
            <NavTabs tabs={tabs} />
        </nav>
    )
}

export default NavBar