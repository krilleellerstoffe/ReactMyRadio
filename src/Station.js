import React from 'react';
import AddOverlay from './AddOverlay';
import RemoveOverlay from './RemoveOverlay';

export default function Station({station, favourite, toggleFavourite}) {

    function handleStaionClick(event) {
        toggleFavourite(station.id)
    }
    return (
        
        <div className="list-item" style={{ textAlign: 'center' }}>
            <label onClick={handleStaionClick}>
                <img className="item-img" src={station.image} alt={station.name} title={station.name}></img>
                {favourite === 'true' ? <RemoveOverlay stationName={station.name} /> : <AddOverlay stationName={station.name}/>}
            </label>
        </div>
            
      );
};