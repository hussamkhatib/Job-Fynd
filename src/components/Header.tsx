import Link from "next/link"

const Header = () => {
    return (
        <header className="flex justify-between items-center py-6 px-8 lg:px-12 w-full">
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="54" height="54" rx="8" fill="black" />
            </svg>

            <Link href="/home">
                <a className="rounded-lg bg-black text-white pt-2 pb-2.5 px-6 text sm:text-lg font-bold">Sign up</a>
            </Link>
        </header>
    )
}

export default Header