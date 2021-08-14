import React, { useState, useEffect } from "react";
import AplicationCard from "./AplicationCard";
import ApplicationForm from "./ApplicationForm";

const Application = ({ user, isUserVerified, activeUser }: any) => {
  const usn = user.nickname;
  const usnLen = usn.length;
  const branch = usn.substring(5, usnLen - 3).toUpperCase();

  const [fieldValues, setFieldValues] = useState({
    jobTitle: "",
    description: "",
    notionid: "",
    cgpa: "",
    linkedin: "",
  });

  const [isFormSubmittedButNotVerified, setIsFormSubmittedButNotVerified] =
    useState(false);

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
    jobTitle: fieldValues.jobTitle,
    description: fieldValues.description,
    notionid: fieldValues.notionid,
    cgpa: fieldValues.cgpa,
    linkedin: fieldValues.linkedin,
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
    setIsFormSubmittedButNotVerified(true);
    localStorage.userDetails = JSON.stringify(userDetails);
    return result;
  };

  const renderForm =
    !localStorage.userDetails &&
    !isUserVerified &&
    !isFormSubmittedButNotVerified
      ? true
      : false;

  useEffect(() => {
    if (localStorage.length) {
      setFieldValues(JSON.parse(localStorage.userDetails));
    }
  }, []);
  return (
    <div className="flex px-4 py-20 max-w-4xl mx-auto">
      {renderForm && (
        <ApplicationForm
          handleChange={handleChange}
          fieldValues={fieldValues}
          registerUser={registerUser}
        />
      )}

      <AplicationCard
        user={user}
        fieldValues={isUserVerified ? activeUser[0] : fieldValues}
        branch={branch}
      />
    </div>
  );
};

export default Application;
