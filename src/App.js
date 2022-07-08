//import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Bar from './Bar.js';

const App = () => {
  //create starting beats
  let startBeats = [];
  for(let i = 0; i < 4; i++) {
    startBeats.push({
      beatCount: i+1,
      playBeat: false,
      type: 1,
    })
  }

  //define beat state
  const [beats, setBeats] = useState(startBeats);
  //define tempo state
  let [tempo, setTempo] = useState(120);
  //define beat interval state
  let [beatInterval, setBeatInterval] = useState(1/(tempo/60));
  //define running status state
  const [isOn, setIsOn] = useState(false);
  //define index state
  let [i, setIndex] = useState(0);
  //define menu styles state
  let [menuStyle, setMenuStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
  });
  //define current selected beat state
  const [selectedBeat, setSelectedBeat] = useState(0);

  //add a beat to the bar
  const addBeatToBar = () => {
    let lastCount = beats[beats.length-1]?.beatCount || 0;
    if(lastCount === 16) return;
    let newBeat = {
      beatCount: lastCount+1,
      playBeat: false,
      type: 1,
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
  }, isOn ? beatInterval*1000 : null);

  const changeTempo = (e) => {
    tempo = Number(e.target.value);
    if(isNaN(tempo) || tempo < 1) tempo = '';
    if(tempo > 200) tempo = 200;
    setTempo(tempo);
  }

  const changeBeatInterval = () => {
    if(tempo) setBeatInterval(1/(tempo/60))
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

  const displayMenu = (event, beatCount) => {
    //determine display type
    let display = 'block';
    if(selectedBeat === beatCount) menuStyle.display === "block" ? display = "none" : display = "block";
    //display and position menu
    setMenuStyle({
      top: `${event.clientY}px`,
      left: `${event.clientX}px`,
      display: display,
    });
    //set selected beat
    setSelectedBeat(beatCount);
  }

  const deleteBeat = () => {
    //delete beat
    setBeats(beats.filter(beat => beat.beatCount !== selectedBeat));
    //reset beatCounts
    /*
    setBeats(beats.map(beat => {
      beat = {...beat, beatCount: i+1};
      return beat;
    }));
    */
    //hide menu
    setMenuStyle({
      ...menuStyle,
      display: "none",
    });
  }

  const changeBeatType = (event) => {
    let input = Number(event.target.value);
    setBeats(beats.map(beat => {
      if (beat.beatCount === selectedBeat) return {...beat, type: input};
      return beat;
    }));
  }
  
  return (
    <> 
      <Bar 
        beats={beats}
        displayMenu={displayMenu}
        addBeatToBar={addBeatToBar}
        beatInterval={beatInterval}
      />
      <div className="menu" style={menuStyle}>
        <div className="delete-beat"> 
          <label className="delete-label" onClick={deleteBeat}> Delete Beat </label>
          <div className="delte-icon" src=""> </div>
        </div>
        <label> Choose Note Type </label>
        <br></br>
        <select id="beat-type" onChange={changeBeatType}>
          <option value="1"> Quarter Note </option>
          <option value="2"> Eighth Notes </option>
          <option value="3"> Triplelets </option>
          <option value="4"> Sixteenth Notes </option>
        </select>
        <br></br>
        <label> Choose Note Sound </label>
        <br></br>
        <select id="sound" onChange={null}>
          <option value=""> sound1 </option>
          <option value=""> sound2 </option>
          <option value=""> sound3 </option>
          <option value=""> sound4 </option>
        </select>
      </div>
      <button className="btn" onClick={toggleMetronome}>
        Start Metronome
      </button>
      <div className="tempo-div">
        <button className="btn" onClick={changeBeatInterval}>
          Change Tempo
        </button>
        <input
          type="text"
          id="tempo"
          max="200"
          value={tempo}
          onChange={changeTempo}
        >
        </input>
      </div>
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