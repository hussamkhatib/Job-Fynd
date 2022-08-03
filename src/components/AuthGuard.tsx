import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Loader from "./ui/Loader";

const AuthGuard = ({ children }: { children: any }) => {
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);
  if (isUser) {
    return children;
  }
  return <Loader />;
};

export default AuthGuard;
