import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import SignUp from "./components/signup";
import Forgot from "./components/forgot";
import Resetpassword from "./components/resetpassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route
            path="/resetpassword.html"
            component={() => <Resetpassword />}
          />
          <Route path="/signup.html" component={() => <SignUp />} />
          <Route path="/forgot.html" component={() => <Forgot />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
