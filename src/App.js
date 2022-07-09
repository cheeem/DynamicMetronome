import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Bar from './Bar.js';
import mn1 from './sounds/mn1.mp3';
import mn2 from './sounds/mn2.mp3';

const App = () => {
  //create starting beats
  const startBeats = [];
  for(let i = 0; i < 4; i++) {
    startBeats.push({
      playNote: false,
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
    {value: mn1, label: "Metronome 1"},
    {value: mn2, label: "Metronome 2"},

  ]

  //define beat state
  const [beats, setBeats] = useState(startBeats);
  //define tempo state
  let [tempo, setTempo] = useState(60);
  //define beat interval state
  let [beatInterval, setBeatInterval] = useState(1/(tempo/60));
  //define running status state
  const [isOn, setIsOn] = useState(false);
  //define beat index state
  let [beatIndex, setBeatIndex] = useState(0);
  //define note index state
  let [noteIndex, setNoteIndex] = useState(0);
  //define menu styles state
  let [menuStyle, setMenuStyle] = useState({display: "none", top: 0, left: 0});
  //define current selected beat state
  const [selected, setSelected] = useState({});

  const addBeatToBar = () => {
    if(beats.length === 16) return;
    let newBeat = {playNote: false, type: 1,}
    setBeats(currentBeats => [...currentBeats, newBeat]);
  }

  useInterval(() => {
    if(noteIndex === beats[beatIndex].type) {
      //next beat
      noteIndex = 0;
      beatIndex++;
    }
    //loop back to first beat
    if(beatIndex === beats.length) beatIndex = 0;
    //change note play status
    setBeats(beats.map((beat, index) => {
      beat = {...beat, playNote: false}
      if (index === beatIndex) beat = {...beat, playNote: noteIndex};
      return beat;
    }));
    setNoteIndex(noteIndex+1);
    setBeatIndex(beatIndex);
  }, isOn ? ((beatInterval/beats[beatIndex].type)*1000) : null);

  const changeTempo = (e) => {
    tempo = Number(e.target.value);
    if(isNaN(tempo) || tempo < 1) tempo = '';
    if(tempo > 200) tempo = 200;
    setTempo(tempo);
  }

  const changeBeatInterval = () => {
    if(tempo) setBeatInterval(1/(tempo/60))
  }

  const toggleMetronome = () => {
    //revert index back to 1
    setBeatIndex(0);
    setNoteIndex(0);
    //turn off the metronome
    setIsOn(isOn !== true);
    //disable played beat
    setBeats(beats.map(beat => {return {...beat, playNote: false}}));
  }

  const displayMenu = (event, selectedData) => {
    //determine display type
    let display = 'block';
    if(selected.noteCount === selectedData.noteCount)
      menuStyle.display === "block" ? display = "none" : display = "block";
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
    //turn off metronome if running and if all beats will be deleted
    if(isOn && beats.length-1 === 0) toggleMetronome();
    //delete beat
    setBeats(beats.filter((beat, index) => index !== selected.beatCount));
    //set beat index
    if(beatIndex) beatIndex--;
    setBeatIndex(beatIndex);
    //reset note index 
    if(selected.playBeat) setNoteIndex(0);
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
    //update beat type
    setBeats(beats.map((beat, index) => {
      if (index === selected.beatCount) beat = {...beat, type: input};
      return beat;
    }));
  }

  const changeSoundType = (event) => {
    //get selected dropdown option (number)
    let input = event.target.value;
    //define function to set state
    let setSound = selected.setSound;
    //update selected sound
    setSelected({...selected, sound: input});
    //update sound state
    setSound(input);
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
        <select className="sound" onChange={changeSoundType} value={selected.sound}>
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