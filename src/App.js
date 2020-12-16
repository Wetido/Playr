import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MainPage from './pages/MainPage';
import { AuthProvider } from "./db/auth"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import PrivateRoute from "./PrivateRoute"

const App = () => {

  return (
        <AuthProvider>
          <Router>
              <Switch>
                <PrivateRoute exact path="/" component={MainPage}/> 
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
              </Switch>
          </Router>
        </AuthProvider>
  );
}

export default App;
