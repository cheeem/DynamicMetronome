import React from 'react';

const Note = ({ canAdd, playBeat, noteDisplay, beatCount }) => {
  let className = determineClassName(canAdd, noteDisplay, beatCount);
  let styles = {};
  if(canAdd) noteDisplay = 'Add a New Beat';
  if(!canAdd) styles = {backgroundColor: playBeat ? "green" : "gray"}
  return (
    <div className={className} style={styles}>
      <div className='note-noteDisplay'> {noteDisplay} </div>
    </div>
  )
}

const determineClassName = (canAdd, noteDisplay, beatCount) => {
  if(canAdd)
    return 'note add'
  if(noteDisplay === beatCount)
    return 'note first';
  return 'note'
}

export default Note;


