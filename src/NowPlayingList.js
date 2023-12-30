import React, { useState } from 'react';
import NowPlaying from './NowPlaying';

export default function NowPlayingList({stations}) {

    return (
        stations.map(station => {
            return <NowPlaying key={station.id} station={station}/>
        })
            
      );
};