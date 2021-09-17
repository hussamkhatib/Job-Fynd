import { NotionRenderer } from "react-notion";

import { getAllPosts } from ".";

export async function getStaticProps({ params: { usn } }: any) {
  // Get all posts again
  const posts = await getAllPosts();

  // Find the current blogpost by usn
  const post = posts.find((t: any) => t.usn === usn);
  // console.log({post})
  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.notionid}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

const StudentPageContainer = ({ post, blocks }: any) => {
  return (
    <div className="max-w-3xl mx-auto py-24">
      <NotionRenderer blockMap={blocks} />
    </div>
  );
};

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((row: any) => `/students/${row.usn}`),
    fallback: false,
  };
}

export default StudentPageContainer;
