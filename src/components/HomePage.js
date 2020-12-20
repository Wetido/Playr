import React, {useState, useEffect} from 'react';
import "../css/Home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import base from "../db/firebase"
import 'firebase/firestore';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


const MainPage = () => {


    
    return (

        <div>
            <div className="recomendedSongs">
                Recomended songs <br></br>
                <button class="recoButton">
                    <img></img>
                </button>
                <button class="recoButton">
                    <img></img>
                </button>
                <button class="recoButton">
                    <img></img>
                </button>
                <button class="recoButton">
                <   img></img>
                </button>
                <button class="recoButton">
                    <img></img>
                </button>
            </div>
            <div className="lastPlayingSongs">
                Last Playing<br></br>
                <button class="lastButton">
                    <img></img>
                </button>
                <button class="lastButton">
                    <img></img>
                </button>
                <button class="lastButton">
                    <img></img>
                </button>
                <button class="lastButton">
                    <img></img>
                </button>
                <button class="lastButton">
                    <img></img>
                </button>
            </div>
        </div>
    );
}

export default MainPage;
