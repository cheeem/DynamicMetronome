import React from 'react';

const Note = ({ playBeat, noteDisplay, beatCount }) => {
  let className = 'note';
  if(noteDisplay === beatCount) className += ' first'
  let styles = {backgroundColor: playBeat ? "green" : "gray"}
  return (
    <div className={className} style={styles}>
      <p> {noteDisplay} </p>
    </div>
  )
}

export default Note;


