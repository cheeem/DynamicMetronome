import React from 'react';

const Note = ({ playBeat, noteDisplay, beatCount, type, displayMenu }) => {
  let className = 'note';
  if(noteDisplay === beatCount) className += ' first'
  if(noteDisplay === beatCount) noteDisplay++;
  let styles = {backgroundColor: playBeat ? "green" : "gray"}
  return (
    <div className={className} style={styles} onClick={(event) => displayMenu(event, {beatCount, noteDisplay, type})}>
      <p> {noteDisplay} </p>
    </div>
  )
}

export default Note;


