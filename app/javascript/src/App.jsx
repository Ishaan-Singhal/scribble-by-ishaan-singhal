import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import "lib/dayjs";

import {
  ARTICLES_PATH,
  DASHBOARD_PATH,
  DASHBOARD_ROUTES,
} from "./components/routeConstants";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Switch>
        {DASHBOARD_ROUTES.map(({ path, component }) => (
          <Route exact component={component} key={path} path={path} />
        ))}
        <Redirect from={DASHBOARD_PATH} to={ARTICLES_PATH} />
      </Switch>
    </Router>
  );
};

export default App;
