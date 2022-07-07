//import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Bar from './Bar.js';

const App = () => {
  const tempo = 120;
  let beatInterval = 1/(tempo/60);

  //create starting beats
  let startBeats = [];
  for(let i = 0; i < 4; i++) {
    startBeats.push({
      beatCount: i+1,
      time: 1/(tempo/60), //might not need
      playBeat: false,
      type: 2,
    })
  }

  //define beat state
  const [beats, setBeats] = useState(startBeats);
  //define delay state
  const [delay, setDelay] = useState(beatInterval);
  //define running status state
  const [isOn, setIsOn] = useState(false);
  //define index state
  let [i, setIndex] = useState(0);

  //add a beat to the bar
  const addBeats = () => {
    let lastCount = beats[beats.length-1]?.beatCount || 0;
    if(lastCount === 16) return;
    let newBeat = {
      beatCount: lastCount+1,
      time: beatInterval,
      playBeat: false,
      type: 2,
    }
    setBeats(currentBeats => {
      return [...currentBeats, newBeat]
    });
  }

  useInterval(() => {
    if(i === beats.length+1) i = 1;
    setBeats(beats.map(beat => {
      beat = {...beat, playBeat: false};
      if (beat.beatCount === i) return {...beat, playBeat: true};
      return beat;
    }));
    setIndex(i+1);
  }, isOn ? delay*1000 : null);

  const changeDelay = (e) => {
    let tempo = Number(e.target.value);
    let beatInterval = 1/(tempo/60);
    setDelay(beatInterval);
  }

  const toggleMetronome = (e) => {
    //turn off the metronome
    setIsOn(isOn !== true);
    //disable played beat
    setBeats(beats.map(beat => {
      beat = {...beat, playBeat: false};
      return beat;
    }));
    //revert index back to 1
    if(isOn) setIndex(1);
  }
  
  return (
    <> 
      <Bar 
        beats={beats}
        addBeats={addBeats}
      />
      <button className="btn" onClick={toggleMetronome}>
        Start Metronome
      </button>
    </>
  )
}

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


export default App;