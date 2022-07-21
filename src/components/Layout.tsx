import BottomNavBar from "./BottomNavBar";
import NavBar from "./NavBar";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <main className="md:grid md:grid-flow-col md:grid-cols-[max-content_1fr] md:h-screen bg-gray-100">
      <NavBar />
      <div className="px-4 overflow-auto">{children}</div>
      <BottomNavBar />
    </main>
  );
};

export default Layout;
