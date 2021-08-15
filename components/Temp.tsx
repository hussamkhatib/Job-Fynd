import React, { useEffect } from "react";

const Temp = () => {
  const showResults = async () => {
    const response = await fetch("/api/he");
    const data = await response.json();
    console.log(data.result.results.map(i=>i.properties));
  };

  return (
    <div>
      <button onClick={() => showResults()}>load res</button>

    </div>
  );
};

export default Temp;
