import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import "lib/dayjs";

import Articles from "./components/Dashboard/Articles";
import Create from "./components/Dashboard/Articles/Form/Create";
import Navbar from "./components/Dashboard/Navbar";
import Settings from "./components/Dashboard/Settings";
import Eui from "./components/EUI";
import PasswordProtected from "./components/EUI/PasswordProtected";

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
        <Route exact path="/" render={() => <Navbar />} />
        <Route exact path="/articles" render={() => <Articles />} />
        <Route exact path="/articles/new" render={() => <Create />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/eui" render={() => <Eui />} />
        <Route exact path="/eui/login" render={() => <PasswordProtected />} />
      </Switch>
    </Router>
  );
};

export default App;
