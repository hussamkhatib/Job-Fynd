import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-blue-50">
      <main className="grid grid-cols-[6rem_1fr_6rem]">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default Layout
