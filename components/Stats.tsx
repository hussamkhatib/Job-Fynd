import React from "react";

const Stats = () => {
  return (
    <div className="bg-blue-400 text-white">
      <div className="flex flex-wrap  p-4 justify-evenly">
        <div className="py-2 text-center">
          <div className="py-2 text-4xl font-bold">3000+</div>
          <h5>STUDENTS PLACED</h5>
        </div>

        <div className="p-2 text-center">
          <div className="py-2 text-4xl font-bold">200+</div>
          <h5>COMPANIES VISITED</h5>
        </div>

        <div className="p-2 text-center">
          <div className="py-2 text-4xl font-bold">33.3lpa</div>
          <h5>Highest package</h5>
        </div>
      </div>
    </div>
  );
};

export default Stats;
