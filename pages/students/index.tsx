import Student from "../../components/Student";
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

export const getAllPosts = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results.map((i: any) => {
    return {
      description: i.properties.description.rich_text[0].plain_text,
      cgpa: i.properties.cgpa.number,
      jobtitle: i.properties.jobtitle.rich_text[0].plain_text,
      linkedin: i.properties.linkedIn.url,
      avatar: i.properties.avatar.url,
      name: i.properties.name.title[0].plain_text,
      branch: i.properties.branch.select.name,
      usn: i.properties.usn.rich_text[0].plain_text,
      notionid: i.properties.notionid.rich_text[0].plain_text,
      id: i.id,
    };
  });
};

export async function getServerSideProps() {
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
