import React from "react";
import Link from "next/link";

const HomeContent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-home">
      <div className="text-5xl">Find best talent</div>
      <div className="pt-2 text-gray-600 text-2xl">
      Donec ullamcorper venenatis et placerat gravida ut.
      </div>
      <div className="pb-12 text-gray-600 text-2xl">
      Nunc eu mattis tellus, porttitor turpis.
      </div>
      <Link href="/students">
        <a className="bg-blue-400 text-white px-5 py-3 rounded text-lg">
          Browse students
        </a>
      </Link>
    </div>
  );
};

export default HomeContent;
