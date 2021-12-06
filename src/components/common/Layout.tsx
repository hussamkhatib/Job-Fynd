import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

const Layout = ({ children }: any) => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="bg-blue-50">
      <p> User details :{JSON.stringify(user, null, 2)}</p>
    </div>
  );
};

export default withPageAuthRequired(Layout);
