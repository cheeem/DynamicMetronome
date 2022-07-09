import {React, useState} from 'react';
import useSound from 'use-sound';
import mn1 from './sounds/mn1.mp3';

const Note = ({ note, beatCount, type, displayMenu }) => {
  //manage sound
  let [sound, setSound] = useState(mn1);
  let [playSound] = useSound(sound);
  if(note.playNote !== false) playSound();
  //manage styles
  let styles = {backgroundColor: note.playNote !== false ? "green" : "gray"}
  //manage classes
  let className = 'note';
  if(note.noteDisplay === beatCount) className += ' first';
  //manage display
  let display = note.noteDisplay;
  if(note.noteDisplay === beatCount) display = note.noteDisplay+1;
  return (
    <div className={className} style={styles} onClick={(event) => displayMenu(event, {beatCount, type, sound, setSound, noteCount: note.noteCount})}>
      <p> {display} </p>
    </div>
  )
}

export default Note;


