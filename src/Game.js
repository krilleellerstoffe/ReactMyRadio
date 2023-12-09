import React from 'react';

export default function Game({game, toggleFavourite}) {

    function handleGameClick(event) {
        toggleFavourite(game.id)
    }
    return (
        
        <div className="list-item">
            <label onClick={handleGameClick}>
                <h2 className="item-text">{game.title} {game.id}</h2>
                <img className="item-img" src="https://cdn.pixabay.com/photo/2017/02/20/04/49/ultimate-2081605_1280.png" alt={game.title}></img>
            </label>
        </div>
            
      );
};