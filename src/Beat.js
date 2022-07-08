import React, { useState } from 'react';
import Note from './Note.js';

const Beat = ({ beat, displayMenu, }) => {
  let noteDisplays = identifyNoteDisplays(beat.type, beat.beatCount);
  let noteList = createNoteList(beat.type, noteDisplays);
  const [notes, setNotes] = useState(noteList);
  return (
    <>
      <div className='beat'>
        {notes.map(note => {
          return <Note
            key={note.noteCount}
            noteDisplay={note.noteDisplay}
            beatCount={beat.beatCount}
            type={beat.type}
            playBeat={beat.playBeat}
            displayMenu={displayMenu}
            />
        })}
      </div>
    </>
  )
}

const createNoteList = (type, noteDisplays) => {
  let noteList = [];
  for(let i = 0; i < type; i++) {
    noteList.push({
      noteCount: i,
      noteDisplay: noteDisplays[i],
      time: 0,
      playNote: false,
      sound: './sounds/mn1.wav',
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