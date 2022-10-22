import React from "react";

import { Typography } from "neetoui";

const Navbar = ({ organization }) => (
  <nav className="border sticky top-0 flex bg-white p-4">
    <Typography className="mx-auto" style="h3">
      {organization?.name}
    </Typography>
  </nav>
);

export default Navbar;
