import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);
  if (isUser) {
    return children;
  }
  return <div>Loading...</div>;
};

export default AuthGuard;
