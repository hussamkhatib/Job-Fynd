import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <main className="grid grid-flow-col grid-cols-[max-content_1fr]">
        <NavBar />
        <div className="px-4 overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
