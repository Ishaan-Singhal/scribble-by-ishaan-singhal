import React, { useState, useEffect } from "react";

import loginLogo from "images/VectorLogin";
import { Typography, Input, Button, PageLoader } from "neetoui";

import { setAuthHeaders } from "apis/axios";
import sessionApi from "apis/eui/sessions";
import organizationApi from "apis/organizations";
import { setToLocalStorage } from "utils/storage";

const PasswordProtected = ({ history }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

  const fetchOrganizationName = async () => {
    try {
      setLoading(true);
      const response = await organizationApi.show();
      setOrganizationName(response.data?.organization.name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await sessionApi.login({ organization: { password } });
      setToLocalStorage("authToken", response.data?.authentication_token);
      setAuthHeaders();
      history.push("/public");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationName();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="m-auto mt-10 max-w-md">
      <img alt="Login" className="m-auto mb-16 max-w-xs" src={loginLogo} />
      <Typography style="h2">
        {organizationName} is password protected!
      </Typography>
      <Typography className="mb-5" style="body2">
        Enter the password to gain access to {organizationName}
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
          handleSubmit();
        }}
      />
    </div>
  );
};

export default PasswordProtected;
