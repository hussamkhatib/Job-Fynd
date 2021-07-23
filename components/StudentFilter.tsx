import React, { useState } from "react";

const StudentFilter = () => {
  const [branch, setBranch] = useState({
    cse: false,
    ise: false,
    eee: false,
    ec: false,
  });

  function branchHandler(e: any) {
    const value = e.target.checked;
    setBranch({
      ...branch,
      [e.target.name]: value,
    });
  }

  return (
    <div className="mt-6 bg-white">
      <section className="text-xl p-2">Filter</section>
      <hr />
      <section className="p-2">
        <div>
          <div className="pb-2">Branch</div>
          <div className="flex flex-col">
            <label className="pb-0.5">
              <input
                type="checkbox"
                name="cse"
                onChange={branchHandler}
                checked={branch.cse}
              />
              <span className="pl-2.5">CSE</span>
            </label>
            <label className="pb-0.5">
              <input
                type="checkbox"
                name="ise"
                onChange={branchHandler}
                checked={branch.ise}
              />
              <span className="pl-2.5">ISE</span>
            </label>
            <label className="pb-0.5">
              <input
                type="checkbox"
                name="ec"
                onChange={branchHandler}
                checked={branch.ec}
              />
              <span className="pl-2.5">EC</span>
            </label>
            <label className="pb-0.5">
              <input
                type="checkbox"
                name="eee"
                onChange={branchHandler}
                checked={branch.eee}
              />
              <span className="pl-2.5">EEE</span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentFilter;
0;
