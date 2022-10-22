import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Switch, Route, Redirect } from "react-router-dom";

import organizationApi from "apis/organizations";
import { getFromLocalStorage } from "utils/storage";

import Navbar from "./Navbar";
import PasswordProtected from "./PasswordProtected";
import Preview from "./Preview";

const Eui = () => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !!authToken;

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      const response = await organizationApi.show();
      setOrganization(response.data?.organization);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Navbar organization={organization} />
      <Switch>
        <Route exact component={PasswordProtected} path="/public/login" />
        {organization.password_enabled && !isLoggedIn && (
          <Redirect to="/public/login" />
        )}
        <Route exact component={Preview} path="/public" />
        <Route exact component={Preview} path="/public/:slug" />
      </Switch>
    </>
  );
};

export default Eui;
