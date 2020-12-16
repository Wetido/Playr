import React, {useState, useEffect, useContext } from 'react';


const Navbar = (props) => {

  
    const [songs, setSongs] = useState([])


    useEffect(() => {

        setSongs(props.songs)
        

    },[props.songs])


    return (
        <div>
            {songs.length !== 0 ? songs.map((song, i) => (
                <div onClick={() => props.handleChangeSong(i)}>{song.name}</div>
            )) : null}
        </div>
        
    );
}

export default Navbar;