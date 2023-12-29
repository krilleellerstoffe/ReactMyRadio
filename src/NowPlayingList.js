import React, { useState } from 'react';
import NowPlaying from './NowPlaying';

export default function NowPlayingList({games}) {

    return (
        games.map(game => {
            return <NowPlaying key={game.id} game={game}/>
        })
            
      );
};