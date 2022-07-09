import React from 'react';

const Note = ({ note, beatCount, type, displayMenu }) => {
  if(note.playNote) console.log(note.playNote);
  let className = 'note';
  if(note.noteDisplay === beatCount) className += ' first'
  if(note.noteDisplay === beatCount) note.noteDisplay++;
  let styles = {backgroundColor: note.playNote ? "green" : "gray"}

  return (
    <div className={className} style={styles} onClick={(event) => displayMenu(event, {beatCount, noteDisplay: note.noteDisplay, type})}>
      <p> {note.noteDisplay} </p>
    </div>
  )
}

export default Note;


