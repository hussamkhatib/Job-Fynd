import { Role } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
import BottomNavBar from "./BottomNavBar";
import NavBar from "./NavBar";

const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const { data } = trpc.useQuery(["users.me"]);

  useEffect(() => {
    if (data && !data.studentRecord && data.role === Role.student) {
      router.push({
        pathname: "/getting-started",
      });
    }
    // router is not added in deps array as re-rendering is not required when route is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return data?.studentRecord || data?.role === Role.admin ? (
    <main className="md:grid md:grid-flow-col md:grid-cols-[max-content_1fr] h-screen bg-gray-100">
      <NavBar />
      <div className="px-4 overflow-auto">{children}</div>
      <BottomNavBar />
    </main>
  ) : (
    <div className="min-h-screen bg-gray-100 px-4 overflow-auto">
      {children}
    </div>
  );
};
export default Layout;
