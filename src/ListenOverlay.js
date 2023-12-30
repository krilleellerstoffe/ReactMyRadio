import React from 'react';

export default function ListenOverlay({station}) {

   
    return (
    
            <div className="overlay">
                <div className="overlay-text top">{station.name}</div>
                <div className="overlay-text bottom">Click to listen live</div>
            </div>
        
            
      );
};