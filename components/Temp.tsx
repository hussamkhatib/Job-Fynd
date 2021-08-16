import React, { useEffect } from "react";

const Temp = () => {
  const showResults = async () => {
    const response = await fetch("/api/getActiveUser");
    const data = await response.json();
    console.log(data.result.results.map((i: any) => i.properties));
  };

  return (
    <div>
      <button onClick={() => showResults()}>load res</button>
    </div>
  );
};

export default Temp;
