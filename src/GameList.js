import React, { useState } from 'react';
import Game from './Game';

export default function GameList({games, toggleFavourite, overlay}) {

    return (
        games.map(game => {
            return <Game key={game.id} toggleFavourite={toggleFavourite} game={game} overlay={overlay}/>
        })
            
      );
};