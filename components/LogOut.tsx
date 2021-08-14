import React from "react";
import Link from "next/link";

const LogOut = () => {
  return (
    <div className="py-4 px-2">
      <Link href="./api/auth/logout">
        <a className="bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold">
          Log out
        </a>
      </Link>
    </div>
  );
};

export default LogOut;
