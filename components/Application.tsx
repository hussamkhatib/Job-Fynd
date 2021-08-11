import React, { useState, useEffect } from "react";
import AplicationCard from "./AplicationCard";
import ApplicationForm from "./ApplicationForm";

const Application = ({ user, showForm, activeUser }: any) => {
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
  const [isFormCompleted, setIsFormCompleted] = useState(false);
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
  const userDetails = {
    jobTitle: state.jobTitle,
    description: state.description,
    notionid: state.notionid,
    cgpa: state.cgpa,
    linkedin: state.linkedin,
    branch: branch,
    name: user.given_name,
    usn: user.nickname,
  };
  const registerUser = async (event: any) => {
    event.preventDefault();

    const res = await fetch("/api/hello", {
      body: JSON.stringify(userDetails),
      method: "POST",
    });
    const result = await res.json();
    setIsFormCompleted(true);
    localStorage.userDetails = JSON.stringify(userDetails);
    return result;
  };

  const renderForm =
    !localStorage.userDetails && showForm && !isFormCompleted ? true : false;

  useEffect(() => {
    if (localStorage.length) {
      setState(JSON.parse(localStorage.userDetails));
    }
  }, []);
  return (
    <div className="flex px-4 py-20 max-w-4xl mx-auto">
      {renderForm && (
        <ApplicationForm
          handleChange={handleChange}
          state={state}
          registerUser={registerUser}
        />
      )}
      <AplicationCard
        user={user}
        state={showForm ? state : activeUser[0]}
        branch={branch}
      />
    </div>
  );
};

export default Application;
