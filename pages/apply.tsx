import { useState } from "react";

function Apply() {
  const [state, setState] = useState({
    title: "",
    description: "",
    name: "",
    notionid: "",
    usn: "",
    cgpa: 0,
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

    console.log("I am atleast getting called");

    const res = await fetch("/api/hello", {
      body: JSON.stringify({
        title: state.title,
        description: state.description,
        name: state.name,
        notionid: state.notionid,
        usn: state.usn,
        cgpa: state.cgpa,
      }),

      method: "POST",
    });

    const result = await res.json();
    return result;
  };

  return (
    <>
      <form onSubmit={registerUser}>
        <div>
          <label htmlFor="title">Title</label>

          <input
            value={state.title}
            onChange={handleChange}
            name="title"
            type="text"
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>

          <input
            value={state.description}
            onChange={handleChange}
            name="description"
            type="text"
            required
          />
        </div>

        <div>
          <label htmlFor="name">Name</label>

          <input
            value={state.name}
            onChange={handleChange}
            name="name"
            type="text"
            required
          />
        </div>

        <div>
          <label htmlFor="notionid">Notion id </label>

          <input
            value={state.notionid}
            onChange={handleChange}
            name="notionid"
            type="text"
            required
          />
        </div>

        <div>
          <label htmlFor="usn">Usn </label>

          <input
            value={state.usn}
            onChange={handleChange}
            name="usn"
            type="text"
            required
          />
        </div>

        <div>
          <label htmlFor="cgpa">cgpa </label>

          <input
            value={state.cgpa}
            onChange={handleChange}
            name="cgpa"
            type="number"
            required
          />
        </div>

        <button type="submit">submit I </button>
      </form>
    </>
  );
}

export default Apply;
