import React from 'react';
import Beat from './Beat.js';

const Bar = ({beats, addBeats, }) => {
  return (
    <>
      <div className='bar'>
        {beats.map(beat => {
            return <Beat
              key={beat.beatCount}
              beat={beat}
            />
        })}
        <Beat
          addBeats={addBeats}
          beatsNum = {beats.length}
          canAdd={true}
          beat={{type: 1}}
        />
      </div>
    </>
  )
}

export default Bar;