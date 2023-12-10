import React, { useState } from 'react';
import Game from './Game';

export default function GameList({games, favourite, toggleFavourite}) {

    return (
        games.map(game => {
            return <Game key={game.id} favourite={favourite} toggleFavourite={toggleFavourite} game={game}/>
        })
            
      );
};