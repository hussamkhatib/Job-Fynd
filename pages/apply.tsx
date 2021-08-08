import { useUser } from "@auth0/nextjs-auth0";
import CreateAnAccount from "../components/CreateAnAccount";
import Application from "../components/Application";

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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const usn = user?.email?.split("@")[0];
  const isFirstTimeUser = posts.some((active: any) => active.usn === usn);
  console.log(isFirstTimeUser);
  return (
    <>
      {user ? (
        <>
          {/* {JSON.stringify(posts, null, 2)}
          {JSON.stringify(user, null, 2)} */}
          <Application posts={posts} user={user} />
        </>
      ) : (
        <CreateAnAccount />
      )}
    </>
  );
}

export default Apply;
