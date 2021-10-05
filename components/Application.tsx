import Link from "next/link";
import React, { useState } from "react";
import AplicationCard from "./AplicationCard";
import ApplicationForm from "./ApplicationForm";
import EditProfile from "./EditProfile";
import LogOut from "./LogOut";

const Application = ({ user, activeUserData, setUserData }: any) => {
  const usn = user.nickname;
  const usnLen = usn.length;
  const branch = usn.substring(5, usnLen - 3).toUpperCase();

  const [fieldValues, setFieldValues] = useState({
    jobtitle: "",
    description: "",
    notionid: "",
    cgpa: "",
    linkedin: "",
  });

  function handleChange(evt: any) {
    const value =
      evt.target.type === "number"
        ? parseInt(evt.target.value)
        : evt.target.value;
    setFieldValues({
      ...fieldValues,
      [evt.target.name]: value,
    });
  }

  const userDetails = {
    jobtitle: fieldValues.jobtitle,
    description: fieldValues.description,
    notionid: fieldValues.notionid,
    cgpa: fieldValues.cgpa,
    linkedin: fieldValues.linkedin,
    branch: branch,
    name: user.given_name,
    usn: user.nickname,
    avatar: user.picture,
  };

  const registerUser = async (event: any) => {
    event.preventDefault();
    console.log("called atleast");
    const res = await fetch("/api/hello", {
      body: JSON.stringify(userDetails),
      method: "POST",
    });
    const data = await res.json();
    setUserData(userDetails);
    return data;
  };

  return (
    <div
      className={`flex ${
        activeUserData && "flex-col"
      } px-4 py-20 max-w-4xl mx-auto`}
    >
      {!activeUserData && (
        <ApplicationForm
          handleChange={handleChange}
          fieldValues={fieldValues}
          registerUser={registerUser}
        />
      )}

      <AplicationCard
        user={user}
        fieldValues={activeUserData ? activeUserData : fieldValues}
        branch={branch}
      />

      {activeUserData && (
        <div className="flex justify-center">
          <EditProfile />
          <LogOut />
          <Link href={`/students/${usn}`}>
            <a className="py-4 px-2" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="lightslategray"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
              </svg>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Application;
