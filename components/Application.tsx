import React, { useState } from "react";
import ApplicationForm from "./ApplicationForm";

const Application = ({ posts }: any) => {
  const [state, setState] = useState({
    jobTitle: "",
    description: "",
    name: "",
    notionid: "",
    usn: "",
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
        name: state.name,
        notionid: state.notionid,
        usn: state.usn,
        cgpa: state.cgpa,
        linkedin: state.linkedin,
        branch: state.branch,
      }),
      method: "POST",
    });
    const result = await res.json();
    return result;
  };

  return (
    <div>
      <ApplicationForm
        handleChange={handleChange}
        state={state}
        registerUser={registerUser}
      />
    </div>
  );
};

export default Application;
