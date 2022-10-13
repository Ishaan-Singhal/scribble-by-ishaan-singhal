import React from "react";

import { ExternalLink } from "neetoicons";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="border sticky top-0 flex flex-wrap items-center justify-between border-solid border-b-gray-400 bg-white p-4">
    <div className="flex items-center">
      <div className="mr-6 flex-shrink-0 font-semibold tracking-tight">
        Scribble
      </div>
      <div className="text-gray-500 ">
        <NavLink
          className="pr-4 font-semibold hover:text-black focus:text-indigo-500"
          to="/articles"
        >
          Articles
        </NavLink>
        <NavLink
          className="pr-4 font-semibold hover:text-black focus:text-indigo-500"
          to="/settings"
        >
          Settings
        </NavLink>
      </div>
    </div>
    <div>
      <NavLink
        className="border rounded mx-2 flex bg-gray-200 px-4 py-2 leading-none text-black"
        to="/public"
      >
        <span className="mx-1">Preview</span>
        <ExternalLink size={16} />
      </NavLink>
    </div>
  </nav>
);

export default Navbar;
