import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Bar from './Bar.js';
import woodblock1 from './sounds/woodblock1.mp3';
import woodblock2 from './sounds/woodblock2.mp3';
import tap1 from './sounds/tap1.wav';
import tap2 from './sounds/tap2.wav';
import snare1 from './sounds/snare1.wav';
import snare2 from './sounds/snare2.wav';
import bass1 from './sounds/bass1.wav';
import bass2 from './sounds/bass2.wav';
import bass3 from './sounds/bass3.wav'
import tom from './sounds/tom.wav';
import ride from './sounds/ride.wav';
import crash from './sounds/crash.wav';

//determine woodblock emoji
const woodblockEmoji = onMobile() ? '🪵' : '🧱';
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
  {value: 1, label: '1️⃣ Quarter Note'},
  {value: 2, label: '2️⃣ Eighth Note'},
  {value: 3, label: '3️⃣ Triplelet'},
  {value: 4, label: '4️⃣ Sixteenth Note'}
];
const soundOptions = [
  {value: woodblock1, label: `${woodblockEmoji} Woodblock 1`, emoji: woodblockEmoji},
  {value: woodblock2, label: `${woodblockEmoji} Woodblock 2`, emoji: woodblockEmoji},
  {value: '', label: '🔇 No Sound', emoji: '🔇'},
  {value: tap1, label: '🥢 Tap 1', emoji: '🥢'},
  {value: tap2, label: '🥢 Tap 2', emoji: '🥢'},
  {value: snare1, label: '🥁 Snare Drum 1', emoji: '🥁'},
  {value: snare2, label: '🥁 Snare Drum 2', emoji: '🥁'},
  {value: bass1, label: '👟 Kick Drum 1', emoji: '👟'},
  {value: bass2, label: '👟 Kick Drum 2', emoji: '👟'},
  {value: bass3, label: '👟 Kick Drum 3', emoji: '👟'},
  {value: tom, label: '🛢️ Tom Drum', emoji: '🛢️'},
  {value: ride, label: '📀 Ride Cymbal', emoji: '📀'},
  {value: crash, label: '📀 Crash Cymbal', emoji: '📀'},
];

const App = () => {
  //define beat state
  const [beats, setBeats] = useState(startBeats);
  //define tempo state
  let [tempo, setTempo] = useState(120);
  //define tempo input state
  let [tempoInput, setTempoInput] = useState('');
  //define tempo button background state
  const [tempoBackground, setTempoBackground] = useState('dimgrey, darkgrey');
  //define tempo cursor state
  const [tempoCursor, setTempoCursor] = useState('not-allowed');
  //define tempo button hover state
  const [tempoHover, setTempoHover] = useState(false);
  //define beat interval state
  let [beatInterval, setBeatInterval] = useState(1/(tempo/60));
  //define running status state
  const [isOn, setIsOn] = useState(false);
  //define beat index state
  let [beatIndex, setBeatIndex] = useState(0);
  //define note index state
  let [noteIndex, setNoteIndex] = useState(0);
  //define menu styles state
  let [menuStyle, setMenuStyle] = useState({display: 'none', top: 0, left: 0});
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
    //change playNote status
    setBeats(beats.map((beat, index) => {
      beat = {...beat, playNote: false}
      if (index === beatIndex) beat = {...beat, playNote: noteIndex};
      return beat;
    }));
    //change playBeat status if the selected beat is being played
    if(selected.beatCount === beatIndex) setSelected({...selected, playBeat: true});
    setNoteIndex(noteIndex+1);
    setBeatIndex(beatIndex);
  }, isOn ? ((beatInterval/beats[beatIndex].type)*1000) : null);

  const processTempoInput = (e) => {
    tempoInput = Number(e.target.value);
    //reset tempo if value is invalid or too small
    if(isNaN(tempoInput) || tempoInput < 1) tempoInput = '';
    //set tempo to 200 if the value is too big
    if(tempoInput > 400) tempoInput = 400;
    //update the tempo (visually shown in the input)
    setTempoInput(tempoInput);
    if(tempoInput) setTempo(tempoInput);
    if(tempoInput) setTempoBackground('red, orange');
    if(tempoInput) setTempoCursor('pointer');
  }

  const changeBeatInterval = () => {
    setTempoInput('');
    setTempoBackground('dimgrey, darkgrey');
    setTempoCursor('not-allowed')
    setBeatInterval(1/(tempo/60));
  }

  const clearTempoPlaceholder = () => {
    setTempo('');
  }

  useEffect(() => {
    if(tempoBackground === 'red, orange')
      setTempoBackground(() => !tempoHover ? 'red, orange' : 'orangered, yellow')
  }, [tempoHover]);

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
    //stop propagation
    event.stopPropagation();
    //determine display type
    let display = 'block';
    if(selected.beatCount === selectedData?.beatCount && selected.noteCount === selectedData?.noteCount)
      menuStyle.display === 'block' ? display = 'none' : display = 'block';
    if(selectedData === false) display = 'none';
    //unselect if menu is hidden
    if(display === 'none') selectedData = {};
    //display and position menu
    if(selectedData !== true) setMenuStyle({
      top: `${event.clientY}px`,
      left: `${event.clientX}px`,
      display: display,
    });
    //set selected beat
    if(selectedData !== true) setSelected(selectedData);
  }

  const deleteBeat = () => {
    //turn off metronome if running and if all beats will be deleted
    if(isOn && beats.length-1 === 0) toggleMetronome();
    //reset note index 
    if(selected.playBeat) setNoteIndex(0);
    //delete beat
    setBeats(beats.filter((beat, index) => index !== selected.beatCount));
    //set back beat index if its the last one
    if(beats.length-1 === beatIndex) beatIndex--;
    setBeatIndex(beatIndex);
    //unselect note
    setSelected({});
    //hide menu
    setMenuStyle({
      ...menuStyle,
      display: 'none',
    });
  }

  const changeBeatType = (event) => {
    //get selected dropdown beat type (number)
    let input = Number(event.target.value);
    //reset note index
    if(selected.playBeat) {
      if(selected.type > input) beatIndex = beats.length-1 === beatIndex ? 0 : beatIndex++;
      setBeatIndex(beatIndex);
      setNoteIndex(0);
    }
    //update selected type
    setSelected({...selected, type: input});
    //update beat type
    setBeats(beats.map((beat, index) => {
      if (index === selected.beatCount) beat = {...beat, type: input};
      return beat;
    }));
  }

  const changeSoundType = (event) => {
    //get selected dropdown sound
    let input = event.target.value;
    //get selected dropdown emoji
    let emoji = soundOptions.filter(option => option.value === input)[0].emoji;
    //define function to set state
    let setSound = selected.setSound;
    //update selected sound
    setSelected({...selected, sound: {play: input, emoji}});
    //update sound state
    setSound({play: input, emoji});
  }
  
  return (
    <>
      <div className='nav'> 
        <div className='header'>
          <div className='logo-img'> </div>
          <div className='title'> Dynamic Metronome </div> 
        </div>
        <ul> 
          <li> <a href='https://github.com/cheeem/Dynamic-Metronome' target='_blank'> GitHub </a> </li>
        </ul>
      </div>
      <div className='app-container' onClick={(event) => displayMenu(event, false)}> 
        <Bar 
          beats={beats}
          display={menuStyle.display}
          selected={selected}
          displayMenu={displayMenu}
          addBeatToBar={addBeatToBar}
        />
        <div className='menu' style={menuStyle} onClick={(event) => displayMenu(event, true)}>
          <div className='menu-header'> Options </div>
          <div className='menu-item delete-beat'> 
            <label className='delete-label' onClick={deleteBeat}> ❌ Delete Beat </label>
          </div>
          <div className='menu-item choose-type'>
            <label> 🎶 Choose Note Type </label>
            <br></br>
            <select className='dropdown type' onChange={changeBeatType} value={selected.type}>
              {beatTypeOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className='menu-item choose-sound'>
            <label> 🔊 Choose Note Sound </label>
            <br></br>
            <select className='dropdown sound' onChange={changeSoundType} value={selected.sound?.play}>
              {soundOptions.map((option, index) => (
                <option key={index} value={option.value}> {option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='control-panel'>
          <div className='toggle-div'>
            <button className='btn toggle' onClick={toggleMetronome}>
              ⏲️ {!isOn ? "Start" : "Stop"} Metronome
            </button>
          </div>
          <div className='tempo-div'>
            <button
              className='btn tempo'
              onClick={changeBeatInterval} 
              onMouseEnter={() => setTempoHover(true)}
              onMouseLeave={() => setTempoHover(false)} 
              style={{backgroundImage: `linear-gradient(to bottom right, ${tempoBackground})`, cursor: tempoCursor}}
            >
              ⏳ Change Tempo
            </button>
            <div className='tempo-input-container'>
              <input
                className='tempo-input'
                type='text'
                id='tempo'
                value={tempoInput}
                placeholder={tempo}
                onChange={processTempoInput}
                onClick={clearTempoPlaceholder}
              >
              </input>
              <label> BPM </label>
            </div>
          </div>
        </div>
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

function onMobile() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];
  
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}

export default App;