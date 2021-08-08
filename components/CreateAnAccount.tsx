import React from "react";
import Link from "next/link";

const CreateAnAccount = () => {
  return (
    <Link href="./api/auth/login">
      <a className="bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded  font-semibold">
        Sign In
      </a>
    </Link>
  );
};

export default CreateAnAccount;
