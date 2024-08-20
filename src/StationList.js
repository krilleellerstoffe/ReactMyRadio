import React, { useState } from 'react';
import Station from './Station';

export default function StationList({stations, favourite, toggleFavourite}) {

    return (
        stations.map(station => {
            return <Station key={station.id} favourite={favourite} toggleFavourite={toggleFavourite} station={station}/>
        })
            
      );
};