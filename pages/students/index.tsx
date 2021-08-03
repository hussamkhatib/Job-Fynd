import Student from "../../components/Student";
import { Client } from  '@notionhq/client'


export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NEXT_PUBLIC_NOTION_DATABASE_ID}`
  ).then((res) => res.json());
};
const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });``
export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}




export default function Home({ posts }: any) {
  return (
    <div>
      <Student posts={posts} />
    </div>
  );
}
