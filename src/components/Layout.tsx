import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <main className="grid grid-flow-col ">
        <NavBar />
        <div className="overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
