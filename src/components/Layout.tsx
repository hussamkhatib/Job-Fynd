import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <main className="grid grid-cols-[6rem_1fr_6rem] lg:px-12">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default Layout