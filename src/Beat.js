import React, { useState } from 'react';
import Note from './Note.js';

const Beat = ({ beat, displayMenu, }) => {
  const noteDisplays = identifyNoteDisplays(beat.type, beat.beatCount);
  const noteList = createNoteList(beat.type, noteDisplays, beat.playNote);
  return (
    <>
      <div className='beat'>
        {noteList.map(note => {
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

const createNoteList = (type, noteDisplays, playNote) => {
  const noteList = [];
  for(let i = 0; i < type; i++) {
    noteList.push({
      noteCount: i,
      noteDisplay: noteDisplays[i],
      playNote: false,
      sound: './sounds/mn1.wav',
    });
    if(playNote === i) noteList[i].playNote = playNote;
  }
  return noteList;
}

const identifyNoteDisplays = (type, beatCount) => {
  if(type === 1) return [beatCount];
  if(type === 2) return [beatCount, "&"];
  if(type === 3) return [beatCount, "trip", "let"];
  if(type === 4) return [beatCount, "e", "&", "ah"];
  return [];
}

export default Beat;