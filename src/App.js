//import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Bar from './Bar.js';

const App = () => {
  //create starting beats
  const startBeats = [];
  for(let i = 0; i < 4; i++) {
    startBeats.push({
      playBeat: false,
      type: 1,
    })
  }
  //create menu dropdown options
  const beatTypeOptions = [
    {value: 1, label: "Quarter Note"},
    {value: 2, label: "Eighth Note"},
    {value: 3, label: "Triplelet"},
    {value: 4, label: "Sixteenth Note"}
  ]
  const soundOptions = [
    {value: "p1", label: "sound1"},
    {value: "", label: "sound2"},
    {value: "p2", label: "sound3"},
    {value: "p3", label: "sound4"}
  ]

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
  let [menuStyle, setMenuStyle] = useState({display: "none", top: 0, left: 0});
  //define current selected beat state
  const [selected, setSelected] = useState({});

  //add a beat to the bar
  const addBeatToBar = () => {
    if(beats.length === 16) return;
    let newBeat = {
      playBeat: false,
      type: 1,
    }
    setBeats(currentBeats => [...currentBeats, newBeat]);
  }

  useInterval(() => {
    if(i === beats.length) i = 0;
    setBeats(beats.map((beat, index) => {
      beat = {...beat, playBeat: false};
      if (index === i) return {...beat, playBeat: true};
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
    if(isOn) setIndex(0);
  }

  const displayMenu = (event, selectedData) => {
    //determine display type
    let display = 'block';
    if(selected.beatCount === selectedData.beatCount) menuStyle.display === "block" ? display = "none" : display = "block";
    //display and position menu
    setMenuStyle({
      top: `${event.clientY}px`,
      left: `${event.clientX}px`,
      display: display,
    });
    //set selected beat
    setSelected(selectedData);
  }

  const deleteBeat = () => {
    //delete beat
    setBeats(beats.filter((beat, index) => index !== selected.beatCount));
    //hide menu
    setMenuStyle({
      ...menuStyle,
      display: "none",
    });
  }

  const changeBeatType = (event) => {
    //get selected dropdown option (number)
    let input = Number(event.target.value);
    //update selected type
    setSelected({...selected, type: input});
    //update beat type (not working??)
    setBeats(beats.map((beat, index) => {
      //if (index === selected.beatCount) console.log({...beat, type: input});
      if (index === selected.beatCount) beat = {...beat, type: input};
      console.log(beat);
      return beat;
    }));
    console.log(beats);
  }
  
  return (
    <> 
      <Bar 
        beats={beats}
        displayMenu={displayMenu}
        addBeatToBar={addBeatToBar}
      />
      <div className="menu" style={menuStyle}>
        <div className="delete-beat"> 
          <label className="delete-label" onClick={deleteBeat}> Delete Beat </label>
          <div className="delte-icon" src=""> </div>
        </div>
        <label> Choose Note Type </label>
        <br></br>
        <select className="beat-type" onChange={changeBeatType} value={selected.type}>
          {beatTypeOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
        <br></br>
        <label> Choose Note Sound </label>
        <br></br>
        <select className="sound" onChange={null} /*value={selected.type.toString()}*/>
          {soundOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
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