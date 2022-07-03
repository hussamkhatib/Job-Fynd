import { FC, ReactElement } from "react";
import BottomNavBar from "./BottomNavBar";
import NavBar from "./NavBar";

interface Props {
  children: ReactElement;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <main className="md:grid md:grid-flow-col md:grid-cols-[max-content_1fr] md:h-screen bg-gray-100">
      <NavBar />
      <div className="px-4 overflow-auto">{children}</div>
      <BottomNavBar />
    </main>
  );
};

export default Layout;
