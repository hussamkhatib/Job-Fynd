import Link from "next/link";

const NOTION_BLOG_ID = '0bd7b86073744122bd61c5c552289447'

export const getAllPosts = async () => {
	return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
}

export async function getStaticProps() {
  const posts = await getAllPosts()

  return {
    props: {
      posts
    },
  };
}


export default function Home({ posts }:any) {

  return (
    <div>
     {posts.map((post:any) => (
        <Link  passHref key={post.slug} href="/[slug]" as={`/${post.slug}`}>
          <div>{post.title}</div>
        </Link>
      ))}
    </div>
  )
}

