import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";

const Navbar = () => {
  const router = useRouter();
  const url = router.pathname;
  const subDirectory = url.slice(1).indexOf("/");
  const page =
    url === "/"
      ? "Home"
      : subDirectory === -1
      ? url.slice(1)
      : url.slice(0, subDirectory).slice(1);
  const title = `${page[0].toUpperCase()}${page.slice(1)} | Tap VVCE`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <nav className="bg-blue-400 px-4">
        <ul className="flex text-white">
          <li
            className={`px-2 py-4  ${
              router.pathname == "/" && "border-b-4 border-solid border-white"
            }`}
          >
            <Link href="/">
              <a className="hover:text-black">Home</a>
            </Link>
          </li>
          <li
            className={`px-2 py-4  ${
              router.pathname == "/students" &&
              "border-b-4 border-solid border-white"
            }`}
          >
            <Link href="/students">
              <a className="hover:text-black">Students</a>
            </Link>
          </li>
          <li
            className={`px-2 py-4  ${
              router.pathname == "/apply" &&
              "border-b-4 border-solid border-white"
            }`}
          >
            <Link href="/apply">
              <a className="hover:text-black">Apply as student</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
