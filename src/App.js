import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MainPage from './pages/MainPage';
import { AuthProvider } from "./db/auth"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import PrivateRoute from "./securuty/PrivateRoute"
import AdminRoute from './securuty/AdminRoute';
import AdminPanel from './pages/AdminPanel';
import ErrorPage from './pages/ErrorPage';

const App = () => {

  return (
        <AuthProvider>
          <Router>
              <Switch>
                <AdminRoute exact path="/adminPanel" component={AdminPanel}/>
                <PrivateRoute exact path="/" component={MainPage}/> 
                <Route exact path ="/errorPage" component={ErrorPage}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
              </Switch>
          </Router>
        </AuthProvider>
  );
}

export default App;
