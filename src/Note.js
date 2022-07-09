import React from 'react';
import useSound from 'use-sound';

const Note = ({ note, beatCount, type, displayMenu }) => {
  //manage sound
  let [playSound] = useSound(note.sound);
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
    <div className={className} style={styles} onClick={(event) => displayMenu(event, {beatCount, noteDisplay: note.noteDisplay, type})}>
      <p> {display} </p>
    </div>
  )
}

export default Note;


