import React, {useState, useEffect} from 'react';

import "./css/main.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar"
import { act } from 'react-dom/test-utils';

const App = () => {

  const [active, setActive] = useState(0)

  

  return (

    <div className="main-container">
      <Navbar>

      </Navbar>
      <div className="row">
        <div className="menu col-sm-2 card">
        <ul class="list-group list-group-flush">
          <li class={active === 0 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(0)}>Home</li>
          <li class={active === 1 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(1)}>Explore</li>
          <li class={active === 2 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(2)}>Search</li>
          <li class={active === 3 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(3)}>Liblary</li>
          <li class={active === 4 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(4)}>Accound & Settings</li>
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
