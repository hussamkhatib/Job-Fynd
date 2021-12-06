import { useUser } from "@auth0/nextjs-auth0";
import Application from "../components/Application";
import { useEffect, useState } from "react";

function Apply() {
  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState(true);
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
      const mappedData = data.result.results.map((i: any) => [
        i.id,
        i.properties,
      ])[0];
      if (mappedData) {
        const prop = mappedData[1];
        const userDetail = {
          id: mappedData[0],
          description: prop.description.rich_text[0].plain_text,
          cgpa: prop.cgpa.number,
          jobtitle: prop.jobtitle.rich_text[0].plain_text,
          linkedin: prop.linkedIn.url,
          avatar: prop.avatar.url,
          notionid: prop.notionid.rich_text[0].plain_text,
        };
        setActiveUserData(userDetail);
      }
      disableLoading();
      return response;
    };
    if (!isLoading) {
      user ? showResults() : disableLoading();
    }
  }, [user, isLoading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Application
      user={user}
      activeUserData={activeUserData}
      setUserData={setUserData}
    />
  );
}

export default Apply
