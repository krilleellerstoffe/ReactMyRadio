import React from 'react';

export default function ListenOverlay({game}) {

   
    return (
    
            <div className="overlay">
                <div className="overlay-text top">{game.name}</div>
                <div className="overlay-text bottom">Click to listen live</div>
            </div>
        
            
      );
};