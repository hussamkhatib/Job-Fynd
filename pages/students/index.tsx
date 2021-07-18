import Student from "../../components/Student";

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
      <Student 
      posts={posts}  
      />
    </div>
  )
}

