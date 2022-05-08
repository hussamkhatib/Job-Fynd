import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <main className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[14rem_1fr]">
        <NavBar />
        <div className="px-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
