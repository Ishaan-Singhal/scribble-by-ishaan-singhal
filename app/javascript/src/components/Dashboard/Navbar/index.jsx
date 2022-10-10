import React from "react";

import { ExternalLink } from "neetoicons";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="border flex flex-wrap items-center justify-between border-solid border-b-gray-400 p-4">
    <div className="flex items-center">
      <div className="mr-6 flex-shrink-0 font-semibold tracking-tight">
        Scribble
      </div>
      <div className="text-gray-500 ">
        <Link
          className="pr-4 font-semibold hover:text-black focus:text-indigo-500"
          to="#responsive-header"
        >
          Articles
        </Link>
        <Link
          className="pr-4 font-semibold hover:text-black focus:text-indigo-500"
          to="#responsive-header"
        >
          Settings
        </Link>
      </div>
    </div>
    <div>
      <Link
        className="border rounded mx-2 flex bg-gray-200 px-4 py-2 leading-none text-black"
        to="#"
      >
        <span className="mx-1">Preview</span>
        <ExternalLink size={16} />
      </Link>
    </div>
  </nav>
);

export default Navbar;
