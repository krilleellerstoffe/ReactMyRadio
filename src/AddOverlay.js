import React from 'react';

export default function AddOverlay({gameName}) {

   
    return (
        
        <>
            <div className="overlay">
                <div className="overlay-text top">{gameName}</div>
                <div className="overlay-text bottom">Click to add to favourites</div>
            </div>
        </>
            
      );
};