import React, { useState } from 'react';
import Note from './Note.js';

const Beat = ({ beat, beatCount, displayMenu, }) => {
  let noteDisplays = identifyNoteDisplays(beat.type, beatCount);
  let noteList = createNoteList(beat.type, noteDisplays);
  const [notes, updateNotes] = useState(noteList);
  return (
    <>
      <div className='beat' onClick={(event) => displayMenu(event, beatCount)}>
        {notes.map(note => {
          return <Note
            key={note.noteCount}
            playBeat={beat.playBeat}
            noteDisplay={note.noteDisplay}
            beatCount={beatCount} />
        })}
      </div>
    </>
  )
}

const createNoteList = (type, noteDisplays) => {
  let noteList = [];
  for(let i = 0; i < type; i++) {
    noteList.push({
      noteCount: i+1,
      noteDisplay: noteDisplays[i],
      time: 0,
      playNote: false,
      sound: '',
    });
  }
  return noteList;
}

const identifyNoteDisplays = (type, beatCount) => {
  if(type === 1)
    return [beatCount];
  if(type === 2)
    return [beatCount, "&"];
  if(type === 3)
    return [beatCount, "trip", "let"];
  if(type === 4) {
    return [beatCount, "e", "&", "ah"];
  }
  return [];
}

export default Beat;