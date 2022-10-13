import React, { useState, useEffect } from "react";

import queryString from "query-string";

import { SETTINGS_NAVLINKS } from "./constants";
import Menu from "./Menu";

import Navbar from "../Navbar";

const Settings = ({ history, location }) => {
  const getActiveNavLink = key =>
    SETTINGS_NAVLINKS.find(navlink => key === navlink.key);
  const { tab } = queryString.parse(location.search);
  const [activeNavlink, setActiveNavlink] = useState(
    () => getActiveNavLink(tab) || SETTINGS_NAVLINKS[0]
  );

  useEffect(() => {
    history.push(activeNavlink?.path);
  }, [activeNavlink]);

  if (location.state?.resetTab) {
    location.state.resetTab = null;
    setActiveNavlink(() => getActiveNavLink(tab));
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Menu
          setActiveNavlink={setActiveNavlink}
          settingsLinks={SETTINGS_NAVLINKS}
        />
        <activeNavlink.component />
      </div>
    </>
  );
};

export default Settings;
