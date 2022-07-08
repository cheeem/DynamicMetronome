import React from 'react';

const AddBeat = ({ addBeatToBar, beatsNum, }) => {
  return (
    <div className="beat" onClick={addBeatToBar} style={{display: beatsNum === 16 ? "none" : "flex"}}>
        <div className="note add">
            Add a New Beat
        </div>
    </div>
  )
}

export default AddBeat;
