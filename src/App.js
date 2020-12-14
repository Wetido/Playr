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
          <li class="list-group-item active">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Morbi leo risus</li>
          <li class="list-group-item">Porta ac consectetur ac</li>
          <li class="list-group-item">Vestibulum at eros</li>
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
