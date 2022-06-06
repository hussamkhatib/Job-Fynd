import React, { FC, ReactElement } from "react";
import NavBar from "./NavBar";

interface Props {
  children: ReactElement;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <main className="grid grid-flow-col grid-cols-[max-content_1fr] h-screen">
        <NavBar />
        <div className="px-4 overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
