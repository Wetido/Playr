import React, {useState, useEffect} from 'react';
import Playlist from 'react-mp3-player';
import ReactHowler from 'react-howler'


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
      {isAudioPlaying === true ? 
        <button onClick={changeAudioHandler}>Stop</button> 
        : <button onClick={changeAudioHandler}>Start</button>}
    </div>
  );
}

export default App;
