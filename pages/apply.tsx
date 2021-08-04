import { useState } from "react";

function Apply() {
  const [state, setState] = useState({
    title: "",
    description: "",
  });

  function handleChange(evt: any) {
    const value = evt.target.value;

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
        description: state.description,
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

        <button type="submit">submit I </button>
      </form>
    </>
  );
}

export default Apply;
