import { LogoutIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'
import Avatar from './ui/Avatar'

const UserMenu = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div>
            <button onClick={() => setShowMenu(!showMenu)} type="button">
                <Avatar size={54} />
            </button>
            {showMenu ? <div
                className="origin-top-right absolute z-40 right-2 p-2 mt-2 w-56 rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
            >

                <div className="py-1" role="none">
                    <Link href="/">
                        <a className="text-red-500 flex items-center px-4 py-2 font-semibold  hover:bg-gray-300">
                            <LogoutIcon className='h-5 w-5' />
                            <span className='ml-2'>Logout</span>
                        </a>
                    </Link>
                </div>
            </div> : null}

        </div>
    )
}

export default UserMenu