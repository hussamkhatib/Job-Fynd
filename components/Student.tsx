import React from 'react'
import Link from "next/link";
import Image from 'next/image'

const Student = ({posts}:any) => {
    console.log({posts})
    return (
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
            {posts.map((post:any) => (
                <Link  passHref key={post.slug} href="/[slug]" as={`/${post.slug}`}>
                    <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden py-2'>
                    <a className=''>
                    
                    <div className='p-3 bg-blue-400 text-white flex items-center'>
                        <Image src={post.image} alt="student avatar" width={80} height={80}/>
                        <div className='px-3'>
                            <div className='text-xl font-semibold   '>{post.name}</div>
                            <div className='text-sm font-normal'>{post.title}</div>
                        </div>

                    </div>

                    <div className='px-2'>
                    <div>cgpa : {post.cgpa}</div>
                    <div className='flex text-white py-2'>
                    {post.tag.map((postTag:any) => (
                    <div className='bg-blue-400 px-2 py-1 mr-2 rounded' key={postTag}>{postTag}</div>
                    ))}
                    </div>
                    
                
                    </div>
                    </a>  
                    <div className='px-3 '>
                        <a href={post.linkedIn} className='flex justify-end'>
                        <svg fill='#2867B2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                    </div>
                    </div>
                </Link>
            ))}
            
        </div>
    )
}

export default Student
