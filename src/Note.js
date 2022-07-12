import {React, useEffect, useState} from 'react';
import useSound from 'use-sound';
import woodblock1 from './sounds/woodblock1.mp3';

const Note = ({ note, beatCount, type, playBeat, display, selected, displayMenu, }) => {
  //manage sound
  let [sound, setSound] = useState({play: woodblock1, emoji: '🧱'});
  let [playSound] = useSound(sound.play);
  useEffect(() => {
    if(sound.play && note.playNote !== false) playSound();
  }, [note.playNote]);
  //define hover state 
  const [hover, setHover] = useState(false);
  //select display state
  let [selectedDisplay, setSelectedDisplay] = useState('none');
  //determine gradient
  let noteGradient = determineGradient(note.playNote, hover, sound.play);
  //define note styles
  let styles = {backgroundImage: noteGradient}
  //manage classes
  let className = 'note';
  if(note.noteDisplay === beatCount) className += ' first';
  //manage display
  let noteDisplay = note.noteDisplay;
  if(note.noteDisplay === beatCount) noteDisplay = note.noteDisplay+1;
  
  //determine select display
  const determineDisplay = (event, beatCount, noteCount) => {
    //let selectedDisplay = display === 'none' ? 'none' : 'block';
    // console.log(display);
    // console.log(selected.beatCount === beatCount && selected.noteCount === noteCount);
    // if(selected.beatCount === beatCount && selected.noteCount === noteCount)
    //   selectedDisplay = display === 'none' ? 'block' : 'none';
    //setSelectedDisplay(selectedDisplay);
  }

  return (
    <div style={{position: 'relative'}}>
      <div 
        className={className} 
        style={styles} 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)} 
        onClick={(event) => {
          displayMenu(event, {beatCount, type, sound, setSound, noteCount: note.noteCount, playBeat});
          determineDisplay(event, beatCount, note.noteCount);
        }}
      >
        <p> 
          {noteDisplay}
        </p>
        <p> 
          {sound.emoji}
        </p>
      </div>
      <div
        className={className}
        style={{
          display: selectedDisplay,
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundImage: 'linear-gradient(to bottom right, blue, lightblue)',
          opacity: 0.5,
        }}
        onClick={(event) => {
          displayMenu(event, {beatCount, type, sound, setSound, noteCount: note.noteCount, playBeat});
          determineDisplay(event, beatCount, note.noteCount);
        }}
      >
      </div>
    </div>
  )
}

const determineGradient = (playNote, hover, sound) => {
  //define gradients
  let defaultGradient = 'linear-gradient(to bottom right, red, orange)';
  let defaultHoverGradient = 'linear-gradient(to bottom right, orangered, yellow)';
  let playGradient = 'linear-gradient(to bottom right, green, lightgreen)';
  let playHoverGradient= 'linear-gradient(to bottom right, lightgreen, lightblue)';
  let noSoundGradient = 'linear-gradient(to bottom right, dimgrey, darkgrey)';
  let noSoundHoverGradient = 'linear-gradient(to bottom right, dimgrey, lightgray)';
  //determine note gradient
  if(!sound) return !hover ? noSoundGradient : noSoundHoverGradient;
  if(playNote === false) return !hover ? defaultGradient : defaultHoverGradient;
  return !hover ? playGradient : playHoverGradient;
}

export default Note;


