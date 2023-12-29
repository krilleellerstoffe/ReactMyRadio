import React from 'react';
import AddOverlay from './AddOverlay';
import RemoveOverlay from './RemoveOverlay';

export default function Station({game, favourite, toggleFavourite}) {

    function handleGameClick(event) {
        toggleFavourite(game.id)
    }
    return (
        
        <div className="list-item" style={{ textAlign: 'center' }}>
            <label onClick={handleGameClick}>
                <img className="item-img" src={game.image} alt={game.name} title={game.name}></img>
                {favourite === 'true' ? <RemoveOverlay gameName={game.name} /> : <AddOverlay gameName={game.name}/>}
            </label>
        </div>
            
      );
};