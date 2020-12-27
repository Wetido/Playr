import React from 'react'
import {Button} from "react-bootstrap"
import {useState} from 'react'

const DonateButton = () => {
    
    const [licznik, setlicznik] = useState(0) 
    const counter = () => {
        setlicznik(licznik + 1)
    } 

    return(
        <div>
            <a href="https://tipply.pl/u/playr" target="_blank"><Button className="btn btn-warning" onClick={counter}>DONATE {licznik}</Button></a>
        </div>
    )
}

export default DonateButton