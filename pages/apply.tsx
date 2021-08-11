import { useUser } from "@auth0/nextjs-auth0";
import CreateAnAccount from "../components/CreateAnAccount";
import Application from "../components/Application";
import { useEffect } from "react";

export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NEXT_PUBLIC_NOTION_DATABASE_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

function Apply({ posts }: any) {
  const { user, error, isLoading } = useUser();

  const usn = user?.email?.split("@")[0];
  const activeUser = posts.filter((active: any) => active.usn === usn);
  // isFirstimeUser is false when user has signed and also filled out form before.
  const isFirstTimeUser = activeUser.length ? false : true;
  useEffect(() => {
    !isFirstTimeUser && localStorage.length && localStorage.clear();
  }, [isFirstTimeUser]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      {user ? (
        <>
          <Application
            posts={posts}
            user={user}
            showForm={isFirstTimeUser}
            activeUser={activeUser}
          />
        </>
      ) : (
        <CreateAnAccount />
      )}
    </>
  );
}

export default Apply;
