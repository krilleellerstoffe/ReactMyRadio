import React from 'react';
import AddOverlay from './AddOverlay';
import RemoveOverlay from './RemoveOverlay';

export default function Game({game, favourite, toggleFavourite}) {

    function handleGameClick(event) {
        toggleFavourite(game.id)
    }
    return (
        
        <div className="list-item">
            <label onClick={handleGameClick}>
                <img className="item-img" src={game.image.original_url} alt={game.name} title={game.name}></img>
                {favourite === 'true' ? <RemoveOverlay /> : <AddOverlay />}
            </label>
        </div>
            
      );
};