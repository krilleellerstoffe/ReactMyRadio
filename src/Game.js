import React from 'react';

export default function Game({game, toggleFavourite}) {

    function handleGameClick(event) {
        toggleFavourite(game.id)
    }
    return (
        
        <div className="list-item">
            <label onClick={handleGameClick}>
                <img className="item-img" src={game.image.original_url} alt={game.name} title={game.name}></img>
            </label>
        </div>
            
      );
};