import React, {useState, useEffect} from 'react';

import "./css/main.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar"

const App = () => {

  
  return (

    <div className="main-container">
      <Navbar>

      </Navbar>
      <div className="row">
        <div className="menu col-sm-2 card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item active">Home</li>
          <li class="list-group-item">Explore</li>
          <li class="list-group-item">Search</li>
          <li class="list-group-item">Liblary</li>
          <li class="list-group-item">Accound & Settings</li>
        </ul>
        </div>
        <div className="main col-sm-9 card">
            Prawa
        </div>
      </div>
    </div>
  );
}

export default App;
