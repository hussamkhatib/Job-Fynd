import LogOut from "./LogOut";

const ApplicationForm = ({ registerUser, fieldValues, handleChange }: any) => {
  return (
    <form onSubmit={registerUser} className="mx-auto ">
      <div className="flex flex-col pb-8">
        <label className="text-xl font-bold pb-2" htmlFor="jobTitle">
          Job Title
        </label>
        <input
          className="shadow-input w-80 hover:shadow-inputhover focus:ring-4 focus:ring-blue-200 rounded  outline-none h-9  "
          value={fieldValues.jobTitle}
          onChange={handleChange}
          name="jobTitle"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col pb-8">
        <label className="text-xl font-bold pb-2" htmlFor="description">
          Description
        </label>
        <input
          className="shadow-input w-80 hover:shadow-inputhover focus:ring-4 focus:ring-blue-200 rounded  outline-none h-9  "
          value={fieldValues.description}
          onChange={handleChange}
          name="description"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col pb-8">
        <label className="text-xl font-bold pb-2" htmlFor="notionid">
          Notion id
        </label>
        <input
          className="shadow-input w-80 hover:shadow-inputhover focus:ring-4 focus:ring-blue-200 rounded  outline-none h-9  "
          value={fieldValues.notionid}
          onChange={handleChange}
          name="notionid"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col pb-8">
        <label className="text-xl font-bold pb-2" htmlFor="cgpa">
          Cgpa
        </label>
        <input
          className="shadow-input w-80 hover:shadow-inputhover focus:ring-4 focus:ring-blue-200 rounded  outline-none h-9  "
          value={fieldValues.cgpa}
          onChange={handleChange}
          name="cgpa"
          type="number"
          required
        />
      </div>

      <div className="flex flex-col pb-8">
        <label className="text-xl font-bold pb-2" htmlFor="linkedin">
          linked Url
        </label>
        <input
          className="shadow-input w-80 hover:shadow-inputhover focus:ring-4 focus:ring-blue-200 rounded  outline-none h-9 "
          value={fieldValues.linkedin}
          onChange={handleChange}
          name="linkedin"
          type="url"
          required
        />
      </div>
      <div className="pt-8">
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded  font-semibold"
          type="submit"
        >
          <span className="pr-2">Submit</span>

          <svg
            className="inline-block"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        <LogOut />
      </div>
    </form>
  );
};

export default ApplicationForm;
