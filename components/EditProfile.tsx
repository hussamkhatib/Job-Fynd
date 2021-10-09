import React from "react";

const EditProfile = ({ edit }: any) => {
  return (
    <button onClick={() => edit()} type="button" className="py-4 px-2">
      <a className="bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold">
        Edit
      </a>
    </button>
  );
};

export default EditProfile;
