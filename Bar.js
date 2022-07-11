import React from 'react';
import Beat from './Beat.js';
import AddBeat from './AddBeat.js'

const Bar = ({beats, display, selected, displayMenu, addBeatToBar, }) => {
  return (
    <>
      <div className='bar'>
        {beats.map((beat, index) => {
            beat.beatCount = index;
            return <Beat
              key={index}
              beat={beat}
              display={display}
              selected={selected}
              displayMenu={displayMenu}
            />
        })}
        <AddBeat
          addBeatToBar={addBeatToBar}
          beatsNum = {beats.length}
        />
      </div>
    </>
  )
}

export default Bar;