import React from 'react';

export default function AddOverlay({stationName}) {

   
    return (
        
        <>
            <div className="overlay">
                <div className="overlay-text top">{stationName}</div>
                <div className="overlay-text bottom">Click to add to favourites</div>
            </div>
        </>
            
      );
};