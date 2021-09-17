import React, { useState } from "react";
import AplicationCard from "./AplicationCard";
import ApplicationForm from "./ApplicationForm";
import EditProfile from "./EditProfile";
import LogOut from "./LogOut";

const Application = ({ user, activeUserData }: any) => {
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
    const result = await res.json();
    return result;
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
        </div>
      )}
    </div>
  );
};

export default Application;
