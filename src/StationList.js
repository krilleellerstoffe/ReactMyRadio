import React, { useState } from 'react';
import Station from './Station';

export default function StationList({games, favourite, toggleFavourite}) {

    return (
        games.map(game => {
            return <Station key={game.id} favourite={favourite} toggleFavourite={toggleFavourite} game={game}/>
        })
            
      );
};