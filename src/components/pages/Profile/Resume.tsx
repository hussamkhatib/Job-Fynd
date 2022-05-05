import NavTabs from "../../NavTabs";
import tabs from "./tabs";
import { DocumentIcon } from "@heroicons/react/outline";
import { useState } from "react";

export const Resume = () => {
  const [selectedFile, setSelectedFile] = useState<any>();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div>
      <NavTabs tabs={tabs} />
      <div className="border-2 ">
        <div className="max-w-xl mx-auto">
          {selectedFile && (
            <div>
              <h2>{selectedFile.name}</h2>
              <div>
                <a className="text-[#0a6cff]" href="./resume">
                  view your resume
                </a>{" "}
                or uplaod a new one below
              </div>
            </div>
          )}

          <form>
            <label className="relative flex flex-col items-center justify-center h-full p-4 border-dashed cursor-pointer ">
              <DocumentIcon className="w-10 h-10" aria-hidden="true" />
              <span className="text-[#0a6cff]">upload new file</span>
              <input
                onChange={changeHandler}
                className="hidden"
                accept=".doc,.docx,.pdf,.rtf,.txt"
                type="file"
                // autoComplete="off"
                // tabIndex="-1"
              />
            </label>
          </form>
          {selectedFile && (
            <button
              className="text-sm text-gray-500"
              type="button"
              onClick={() => setSelectedFile(null)}
            >
              Remove your resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
