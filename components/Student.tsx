import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import StudentFilter from "./StudentFilter";

const Student = ({ posts }: any) => {
  const [filterArr, setFilterArr] = useState([]);
  const router = useRouter();
  const [branch, setBranch]: any = useState({
    cs: false,
    ise: false,
    eee: false,
    ec: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const getBranches = params.get("branch")?.split(",");
    if (getBranches) {
      const newBr = { ...branch };
      for (let i = 0; i < getBranches.length; i++) {
        newBr[getBranches[i]] = true;
      }
      setBranch(newBr);
    }
  }, []);

  function branchHandler(e: any) {
    const value = e.target.checked;
    const br = {
      ...branch,
      [e.target.name]: value,
    };
    setBranch(br);
    let activeBranches = [];
    for (const i in br) {
      br[i] && (activeBranches = [...activeBranches, i.toUpperCase()]);
    }
    router.push(
      `/students${
        activeBranches.length
          ? `?branch=${activeBranches.join(",").toLowerCase()}`
          : ""
      }`
    );

    const showResults = async () => {
      const response = await fetch("/api/filterUsers", {
        method: "POST",
        body: JSON.stringify({ branch: activeBranches }),
      });
      const data = await response.json();
      console.log(data);
      const mappedData = data.result.results.map((i: any) => {
        return {
          description: i.properties.description.rich_text[0].plain_text,
          cgpa: i.properties.cgpa.number,
          jobtitle: i.properties.jobtitle.rich_text[0].plain_text,
          linkedin: i.properties.linkedIn.url,
          usn: i.properties.usn.rich_text[0].plain_text,
          name: i.properties.name.title[0].plain_text,
          branch: i.properties.branch.select.name,
          id: i.id,
        };
      });
      data && setFilterArr(mappedData);
      return response;
    };
    if (activeBranches.length) {
      showResults();
    } else {
      setFilterArr([]);
    }
  }
  const students = filterArr.length ? filterArr : posts;

  return (
    <div className="lg:grid grid-cols-student ">
      <div className="p-3">
        <StudentFilter branch={branch} branchHandler={branchHandler} />
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 px-2">
        {students.map((post: any) => (
          <Link
            passHref
            key={post.id}
            href="students/[usn]"
            as={`/students/${post.usn}`}
          >
            <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden py-2 flex flex-col justify-between bg-white">
              <a className="">
                <div className="p-3 bg-blue-400 text-white flex items-center">
                  <Image
                    className="rounded-full"
                    src="https://media.istockphoto.com/vectors/natural-landscape-background-with-japanese-pattern-vector-abstract-vector-id1255330885?b=1&k=6&m=1255330885&s=170667a&w=0&h=l8koCt67YMJZ3MWZWB5J2EmMVgOS_WhDMUwLMtrfEOQ="
                    alt="student avatar"
                    width={80}
                    height={80}
                  />
                  <div className="px-3">
                    <div className="text-xl font-semibold">{post.name}</div>
                    <div className="text-sm font-normal">{post.jobtitle}</div>
                  </div>
                </div>
              </a>
              <div className="px-3 py-2">{post.description}</div>
              <div className="px-3 flex justify-between">
                <div className="flex text-white py-2">
                  {post.branch && (
                    <div className="bg-blue-400 px-2 mr-2 py-1 rounded">
                      {post.branch}
                    </div>
                  )}
                  {post.cgpa && (
                    <div className="bg-blue-400 px-2  py-1 rounded">
                      {post.cgpa}
                    </div>
                  )}
                </div>
                <a href={post.linkedIn} className="flex items-center">
                  <svg
                    fill="#2867B2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Student;
