import {React, useEffect, useState} from 'react';
import useSound from 'use-sound';
import mn1 from './sounds/mn1.mp3';

const Note = ({ note, beatCount, type, playBeat, displayMenu, }) => {
  //manage sound
  let [sound, setSound] = useState(mn1);
  let [playSound] = useSound(sound);
  useEffect(() => {
    if(note.playNote !== false) playSound();
  }, [note.playNote])
  //manage styles
  let playGradient = "linear-gradient(green, lightgreen)";
  let defaultGradient = "linear-gradient(red, yellow)";
  let styles = {backgroundImage: note.playNote !== false ? playGradient : defaultGradient}
  //manage classes
  let className = 'note';
  if(note.noteDisplay === beatCount) className += ' first';
  //manage display
  let display = note.noteDisplay;
  if(note.noteDisplay === beatCount) display = note.noteDisplay+1;
  return (
    <div className={className} style={styles} onClick={(event) => displayMenu(event, {beatCount, type, sound, setSound, noteCount: note.noteCount, playBeat})}>
      <p> 
        {display}
      </p>
    </div>
  )
}

export default Note;


