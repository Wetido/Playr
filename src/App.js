import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MainPage from './pages/MainPage';
import AddSong from './pages/AddSong';

const App = () => {

  return (

        <Router>
            <Switch>
              <Route exact path="/" component={MainPage}> 
              </Route>
            <Route exact path="/addSong" component={AddSong}>
            </Route>
            </Switch>
        </Router>
  );
}

export default App;
