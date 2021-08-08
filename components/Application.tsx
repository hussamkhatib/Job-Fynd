import React, { useState } from "react";
import AplicationCard from "./AplicationCard";
import ApplicationForm from "./ApplicationForm";

const Application = ({ posts, user }: any) => {
  const [state, setState] = useState({
    jobTitle: "",
    description: "",
    notionid: "",
    cgpa: "",
    linkedin: "",
    branch: "",
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
        branch: state.branch,
        name: user.given_name,
        usn: user.nickname,
      }),
      method: "POST",
    });
    const result = await res.json();
    return result;
  };

  return (
    <div className="flex">
      <ApplicationForm
        handleChange={handleChange}
        state={state}
        registerUser={registerUser}
      />
      <AplicationCard user={user} state={state} />
    </div>
  );
};

export default Application;
