import React, { useState } from 'react';
import Note from './Note.js';

const Beat = ({ beat, displayMenu, }) => {
  const noteDisplays = identifyNoteDisplays(beat.type, beat.beatCount);
  const notes = createNotes(beat.type, noteDisplays, beat.playNote);
  return (
    <>
      <div className='beat'>
        {notes.map(note => {
          return <Note
            key={note.noteCount}
            note={note}
            beatCount={beat.beatCount}
            type={beat.type}
            displayMenu={displayMenu}
            />
        })}
      </div>
    </>
  )
}

const createNotes = (type, noteDisplays, playNote) => {
  const notes = [];
  for(let i = 0; i < type; i++) {
    notes.push({
      noteCount: i,
      noteDisplay: noteDisplays[i],
      playNote: playNote === i ? playNote : false,
    });
  }
  return notes;
}

const identifyNoteDisplays = (type, beatCount) => {
  if(type === 1) return [beatCount];
  if(type === 2) return [beatCount, "&"];
  if(type === 3) return [beatCount, "trip", "let"];
  if(type === 4) return [beatCount, "e", "&", "ah"];
  return [];
}

export default Beat;