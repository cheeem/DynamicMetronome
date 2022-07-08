import React from 'react';
import Beat from './Beat.js';
import AddBeat from './AddBeat.js'

const Bar = ({beats, displayMenu, addBeatToBar, beatInterval, }) => {
  return (
    <>
      <div className='bar'>
        {beats.map((beat, i) => {
            return <Beat
              key={i+1}
              beatCount={i+1}
              beat={beat}
              displayMenu={displayMenu}
              beatInterval={beatInterval}
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