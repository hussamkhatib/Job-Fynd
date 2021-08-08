import React, { useState } from "react";
import AplicationCard from "./AplicationCard";
import ApplicationForm from "./ApplicationForm";

const Application = ({ posts, user }: any) => {
  const usn = user.nickname;
  const usnLen = usn.length;
  const branch = usn.substring(5, usnLen - 3).toUpperCase();

  const [state, setState] = useState({
    jobTitle: "",
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
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const registerUser = async (event: any) => {
    event.preventDefault();
    const res = await fetch("/api/hello", {
      body: JSON.stringify({
        jobTitle: state.jobTitle,
        description: state.description,
        notionid: state.notionid,
        cgpa: state.cgpa,
        linkedin: state.linkedin,
        branch: branch,
        name: user.given_name,
        usn: user.nickname,
      }),
      method: "POST",
    });
    const result = await res.json();
    return result;
  };

  return (
    <div className="flex px-4 py-20 ">
      <ApplicationForm
        handleChange={handleChange}
        state={state}
        registerUser={registerUser}
      />
      <AplicationCard user={user} state={state} branch={branch} />
    </div>
  );
};

export default Application;
