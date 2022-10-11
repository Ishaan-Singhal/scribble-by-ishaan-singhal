import React, { useState } from "react";

import { Typography, Input, Button } from "neetoui";

import Navbar from "./Navbar";

const PasswordProtected = () => {
  const [password, setPassword] = useState("");

  return (
    <>
      <Navbar />
      <div className="m-auto mt-10 max-w-md">
        <img alt="Login" className="m-auto mb-16 max-w-xs" src="#" />
        <Typography style="h2">Spinkart is password protected!</Typography>
        <Typography className="mb-5" style="body2">
          Enter the password to gain access to Spinkart
        </Typography>
        <Input
          required
          className="mb-6"
          id="user_password"
          label="Password"
          placeholder="******"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          label="Continue"
          style="primary"
          type="submit"
          onClick={() => {
            //handleSubmit();
          }}
        />
      </div>
    </>
  );
};

export default PasswordProtected;
