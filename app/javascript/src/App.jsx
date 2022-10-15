import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Eui from "components/EUI";
import "lib/dayjs";

import {
  ARTICLES_PATH,
  DASHBOARD_PATH,
  DASHBOARD_ROUTES,
  EUI_PATH,
} from "./components/routeConstants";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Eui} path={EUI_PATH} />
        {DASHBOARD_ROUTES.map(({ path, component }) => (
          <Route exact component={component} key={path} path={path} />
        ))}
        <Redirect from={DASHBOARD_PATH} to={ARTICLES_PATH} />
      </Switch>
    </Router>
  );
};

export default App;
