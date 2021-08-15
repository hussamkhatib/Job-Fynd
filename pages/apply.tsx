import { useUser } from "@auth0/nextjs-auth0";
import CreateAnAccount from "../components/CreateAnAccount";
import Application from "../components/Application";
import { useEffect, useState } from "react";

function Apply() {
  const { user, error, isLoading } = useUser();
  const [activeUserData, setActiveUserData] = useState(null);

  useEffect(() => {
    const showResults = async () => {
      const response = await fetch("/api/getUser", {
        method: "POST",
        body: JSON.stringify({ usn: user?.nickname }),
      });
      const data = await response.json();
      const mappedData = data.result.results.map((i: any) => i.properties)[0];
      const userDetail = {
        description: mappedData.description.rich_text[0].plain_text,
        cgpa: mappedData.cgpa.number,
        jobtitle: mappedData.jobtitle.rich_text[0].plain_text,
        linkedin: mappedData.linkedIn.url,
      };
      data && setActiveUserData(userDetail);
      return response;
    };
    user && showResults();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      {user ? (
        <>
          <Application user={user} activeUserData={activeUserData} />
        </>
      ) : (
        <CreateAnAccount />
      )}
    </>
  );
}

export default Apply;
