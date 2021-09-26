import { useUser } from "@auth0/nextjs-auth0";
import CreateAnAccount from "../components/CreateAnAccount";
import Application from "../components/Application";
import { useEffect, useState } from "react";

function Apply() {
  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState(isLoading);
  const [activeUserData, setActiveUserData] = useState<any>(null);

  const disableLoading = () => setLoading(false);
  const setUserData = (param: Object) => {
    setActiveUserData(param);
  };
  useEffect(() => {
    const showResults = async () => {
      const response = await fetch("/api/getActiveUser", {
        method: "POST",
        body: JSON.stringify({ usn: user?.nickname }),
      });
      const data = await response.json();
      const mappedData = data.result.results.map((i: any) => i.properties)[0];

      if (!mappedData) {
        disableLoading();
        return;
      } else {
        const userDetail = {
          description: mappedData.description.rich_text[0].plain_text,
          cgpa: mappedData.cgpa.number,
          jobtitle: mappedData.jobtitle.rich_text[0].plain_text,
          linkedin: mappedData.linkedIn.url,
          avatar: mappedData.avatar.url,
        };
        setActiveUserData(userDetail);
        disableLoading();
      }
      return response;
    };
    user && showResults();
  }, [user]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user ? (
        <>
          <Application
            user={user}
            activeUserData={activeUserData}
            setUserData={setUserData}
          />
        </>
      ) : (
        <CreateAnAccount />
      )}
    </>
  );
}

export default Apply;
