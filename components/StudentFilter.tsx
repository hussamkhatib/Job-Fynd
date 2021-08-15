import React from "react";

const StudentFilter = ({ branchHandler, branch }: any) => {
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
                name="cs"
                onChange={branchHandler}
                checked={branch.cs}
              />
              <span className="pl-2.5">CS</span>
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
