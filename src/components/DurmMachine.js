import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const soundUrls = {
  Q: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  W: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  E: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  A: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  S: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  D: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  Z: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  X: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  C: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
};

const BtnNames = {
  Q: 'Heater 1',
  W: 'Heater 2',
  E: 'Heater 3',
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
    <div id="drum-machine">
      <div id="rightWraper">
        <ToggleButton />
        <div id="display" />
        <div id="volumeBarWrap">
          <VolumeBar value={volume} onVolumeChange={setVolume} />
        </div>
      </div>
      <div id="leftWraper">
        <Pad volume={volume} />
      </div>
    </div>
  );
};

//------------------------------------------------
const Pad = ({ volume }) => {
  const playSound = (audioUrl, audioId) => {
    const audioElement = document.getElementById(audioId);
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.volume = volume;
    audioElement.play().catch((error) => {
      console.error('Playback error:', error);
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
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="buttonWraper">
      {Object.keys(BtnNames).map((key) => (
        <button
          key={key}
          type="button"
          className="drum-pad btn"
          id={BtnNames[key].replace(' ', '')}
          onClick={() => playSound(soundUrls[key], key)}
        >
          {key}
          <audio className="clip" id={key} src={soundUrls[key]} type="audio/mpeg">
            <track kind="captions" />
          </audio>
        </button>
      ))}
    </div>
  );
};

Pad.propTypes = {
  volume: PropTypes.number.isRequired,
};

//------------------------------------------------
const VolumeBar = ({ value, onVolumeChange }) => {
  const handleVolume = useCallback(
    (e) => {
      onVolumeChange(e.target.value);
      document.getElementById('volumeoutput').value = Math.round(e.target.value * 100);
    },
    [onVolumeChange]
  );

  return (
    <>
      <input id="volumebar" type="range" name="volume" min="0" max="1" step="0.01" onChange={handleVolume} value={value} />
      <output id="volumeoutput" htmlFor="volume">
        {Math.round(value * 100)}
      </output>
    </>
  );
};

VolumeBar.propTypes = {
  value: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

//------------------------------------------------
const ToggleButton = () => {
  const toggle = () => {
    toggleOn = !toggleOn;
    const checkBall = document.querySelector('#checkBall');
    const checkText = document.querySelector('#checkText');
    const volumeBar = document.querySelector('#volumebar');
    const drumPads = document.querySelectorAll('.drum-pad');

    if (!toggleOn) {
      checkBall.style.gridArea = 'c';
      checkText.style.gridArea = 'a';
      checkBall.style.marginLeft = '20px';
      checkText.style.marginLeft = '20px';
      checkText.textContent = 'OFF';
      checkText.style.color = 'rgb(180, 180, 180)';
      volumeBar.classList.add('disableClass');
      drumPads.forEach((el) => el.classList.add('disableClass'));
    } else {
      checkBall.style.gridArea = 'a';
      checkText.style.gridArea = 'c';
      checkBall.style.marginLeft = '5px';
      checkText.style.marginLeft = '5px';
      checkText.textContent = 'ON';
      checkText.style.color = 'rgb(200, 250, 250)';
      volumeBar.classList.remove('disableClass');
      drumPads.forEach((el) => el.classList.remove('disableClass'));
    }
  };

  return (
    <div className="powerBtn" role="button" tabIndex={0} onClick={toggle} onKeyPress={toggle}>
      <span id="checkBall"></span>
      <div id="checkText">ON</div>
    </div>
  );
};

//------------------------------------------------
export default App;
