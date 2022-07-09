import React from 'react';

const Note = ({ note, beatCount, type, displayMenu }) => {
  //if(note.playNote === beatCount) console.log(note.playNote);
  //if(note.playNote) console.log(note.playNote);
  let className = 'note';
  let audio = new Audio(note.sound);
  if(note.noteDisplay === beatCount) className += ' first'
  if(note.noteDisplay === beatCount) note.noteDisplay++;
  //if(note.playNote !== false) audio.play();
  let styles = {backgroundColor: note.playNote !== false ? "green" : "gray"}

  return (
    <div className={className} style={styles} onClick={(event) => displayMenu(event, {beatCount, noteDisplay: note.noteDisplay, type})}>
      <p> {note.noteDisplay} </p>
    </div>
  )
}

export default Note;


