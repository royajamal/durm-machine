import React, { useState, useEffect, useCallback } from 'react'; 
import './App.css';

const Heater1 = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3';
const Heater2 = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3';
const Heater3 = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3';
const Heater4 = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3';
const Clap = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3';
const OpenHH = 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3';
const KicknHat = 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3';
const Kick = 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3';
const ClosedHH = 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3';
const BtnNames = {
  Q: 'Heater 1',
  W: 'Heater 2',
  E: 'Heater3',
  A: 'Heater 4',
  S: 'Clap',
  D: 'Open HH',
  Z: 'Kick n Hat',
  X: 'Kick',
  C: 'Closed HH',
};
let toggleOn = true;

//------------------------------------------------
const App = () => {
  const [volume, setVolume] = useState(1);
  return (
    <>
      <div id="drum-machine">
        <div id="rightWraper">
         <ToggleButton />
          <div id="display"></div>
          <div id="volumeBarWrap">
            <VolumeBar value={volume} onVolumeChange={setVolume} />
          </div>
        </div>
        <div id="leftWraper">
          <Pad volume={volume} />
        </div>
      </div>
    </>
  );
};
//------------------------------------------------
const Pad = ({ volume }) => {
  const playSound = (audio, letter) => {
    const audioId = document.querySelector('#' + letter);
    document.querySelector('#display').textContent = BtnNames[letter];
    // Make sure any previous playback is stopped before playing the new sound
    audioId.pause();
    audioId.currentTime = 0;
    audioId.volume = volume;
    audioId.play().catch(error => {
      console.error("Playback error:", error);
    });
  };

  const handleKeyPress = (event) => {
    if (toggleOn) {
      const key = event.key.toUpperCase();
      const button = document.querySelector(`#${key}`);
      if (button) {
        button.click();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div id="buttonWraper">
        <button className="drum-pad btn" id="Heater1" onClick={() => { playSound(Heater1, "Q") }}>Q
          <audio className="clip" id="Q" src={Heater1} type="audio/mpeg"></audio>
        </button>
        <button className="drum-pad btn" id="Heater2" onClick={() => { playSound(Heater2, "W") }}>W
          <audio className="clip" id="W" src={Heater2} type="audio/mpeg"></audio>
        </button>
        <button className="drum-pad btn" id="Heater3" onClick={() => { playSound(Heater3, "E") }}>E
          <audio className="clip" id="E" src={Heater3} type="audio/mpeg"></audio>
        </button>
        <button className="drum-pad btn" id="Heater4" onClick={() => { playSound(Heater4, "A") }}>A
          <audio className="clip" id="A" src={Heater4} type="audio/mpeg"></audio>
        </button>
        <button className="drum-pad btn" id="Clap" onClick={() => { playSound(Clap, "S") }}>S
          <audio className="clip" id="S" src={Clap} type="audio/mpeg"></audio>
        </button>
        <button className="drum-pad btn" id="OpenHH" onClick={() => { playSound(OpenHH, "D") }}>D
          <audio className="clip" id="D" src={OpenHH} type="audio/mpeg"></audio>
        </button>
        <button className="drum-pad btn" id="KicknHat" onClick={() => { playSound(KicknHat, "Z") }}>Z
          <audio className="clip" id="Z" src={KicknHat} type="audio/mpeg"></audio>
        </button>
        <button className="drum-pad btn" id="Kick" onClick={() => { playSound(Kick, "X") }}>X
          <audio className="clip" id="X" src={Kick} type="audio/mpeg"></audio>
        </button>
        <button className="drum-pad btn" id="ClosedHH" onClick={() => { playSound(ClosedHH, "C") }}>C
          <audio className="clip" id="C" src={ClosedHH} type="audio/mpeg"></audio>
        </button>
      </div>
    </>
  );
};
//------------------------------------------------
const VolumeBar = ({value, onVolumeChange}) => {
  const handlevolume = useCallback(e => {
    onVolumeChange(e.target.value);
    document.getElementById("volumeoutput").value = Math.round(e.target.value * 100);
  }, [onVolumeChange])
  
  return (
    <>
      <input id="volumebar" type="range" name="volume" min="0" max="1" step="0.01" onChange={handlevolume} />
      <output id="volumeoutput" for="volume">100</output>
    </>
  )
}
//------------------------------------------------
const ToggleButton = () => {
  const toggle = () => {
    if (toggleOn){
      toggleOn = false;
      document.querySelector("#checkBall").style.gridArea = "c";
      document.querySelector("#checkText").style.gridArea = "a";
      document.querySelector("#checkBall").style.marginLeft = "20px";
      document.querySelector("#checkText").style.marginLeft = "20px";
      document.querySelector("#checkText").textContent = "OFF"
      document.querySelector("#checkText").style.color = "rgb(180, 180, 180)"
      document.querySelector("#volumebar").addClass("disableClass");
      document.querySelector(".drum-pad").addClass("disableClass");
    }
    else if (!toggleOn){
      toggleOn = true;
      document.querySelector("#checkBall").style.gridArea = "a";
      document.querySelector("#checkText").style.gridArea = "c";
      document.querySelector("#checkBall").style.marginLeft = "5px";
      document.querySelector("#checkText").style.marginLeft = "5px";
      document.querySelector("#checkText").textContent = "ON"
      document.querySelector("#checkText").style.color = "rgb(200, 250, 250)"
      document.querySelector("#volumebar").removeClass("disableClass");
      document.querySelector(".drum-pad").removeClass("disableClass");
    }
  }
  return (
  <>
    <div className="powerBtn" onClick={toggle}>
      <span id="checkBall"></span>
      <div id="checkText">ON</div>
    </div>  
  </>
  )
}
//------------------------------------------------
export default App;
