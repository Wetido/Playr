import React, {useState, useEffect} from 'react';
import Playlist from 'react-mp3-player';
import ReactHowler from 'react-howler'
import "./css/main.css"

const App = () => {

  const [audio, setAudio] = useState(new Audio("https://goldfirestudios.com/proj/howlerjs/sound.ogg"))

  const [isAudioPlaying, setIsAudioPlaying] = useState(false)


  const changeAudioHandler = () => {
    
    setIsAudioPlaying(!isAudioPlaying)
  }

  useEffect(() => {
    if(isAudioPlaying){
      audio.play()
    }else{
      audio.pause()
    }

  }, [isAudioPlaying])


  return (
    <div>
      <div>
        {isAudioPlaying === true ? 
          <button onClick={changeAudioHandler}>Stop</button> 
          : <button onClick={changeAudioHandler}>Start</button>}
      </div>
      <div className="divtext">
          hello World
      </div>
    </div>
  );
}

export default App;
