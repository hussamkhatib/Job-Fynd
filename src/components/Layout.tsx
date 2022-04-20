import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <main className="grid grid-cols-[14rem_1fr]">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
