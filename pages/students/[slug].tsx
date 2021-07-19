import { NotionRenderer } from "react-notion";

import { getAllPosts } from './'

export async function getStaticProps({ params: { slug } }:any) {
  // Get all posts again
  const posts = await getAllPosts();

  // Find the current blogpost by slug
  const post = posts.find((t:any) => t.slug === slug);
  const blocks = await fetch(`https://notion-api.splitbee.io/v1/page/${post.id}`).then((res) => res.json());
    
  return {
    props: {
     blocks,
     post,
    },
  };
}

const StudentPageContainer = ({ post, blocks }:any) => {
  return (
  <div style={{ maxWidth: 768 }}>
    <h1>{post.name}</h1>
    <NotionRenderer blockMap={blocks} />
  </div>
);}


export async function getStaticPaths() {
    const posts = await getAllPosts();
    return {
      paths: posts.map((row:any) => `/students/${row.slug}`),
      fallback: true,
    };
  }

  export default StudentPageContainer;