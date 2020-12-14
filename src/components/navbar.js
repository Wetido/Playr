import React, {useState, useEffect} from 'react';

const Navbar = () => {

    //only for mocking purpose
    const links = ["https://sethares.engr.wisc.edu/mp3s/simptun1.mp3" 
        , "https://sethares.engr.wisc.edu/mp3s/challoct.mp3" 
        , "https://goldfirestudios.com/proj/howlerjs/sound.ogg"]


    
    const [audio] = useState(new Audio(links[0]))

    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [songIndex, setSongIndex] = useState(0)

    const changeAudioHandler = () => {
        setIsAudioPlaying(!isAudioPlaying)
    }
    
    const handlePrevSong = () => {

        setSongIndex(songIndex - 1);
    }

    const handleNextSong = () => {

        setSongIndex(songIndex + 1);
    }

    useEffect(() => {
        
        if(isAudioPlaying){
            //audio.load()
            audio.play()
        }else{
            audio.pause()
        }
    }, [isAudioPlaying])


    useEffect(() => {

        audio.src = links[songIndex]
        setIsAudioPlaying(false)
    },[songIndex])


    return (
        <div className="navbar">
            <div>
                <button onClick={handlePrevSong}>Previous</button>
            </div>
            <div>
                {isAudioPlaying === true ? 
                <button onClick={changeAudioHandler}>Stop</button> 
                : <button onClick={changeAudioHandler}>Start</button>}
            </div>
            <div>
                <button onClick={handleNextSong}>Next</button>
            </div>
        </div>
        
    );
}

export default Navbar;