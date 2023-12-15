import React from 'react';
import RemoveOverlay from './RemoveOverlay';

export default function Task({task, remove}) {

    function handleGameClick(event) {
        remove(task.id)
    }
    return (
        
        <div className="list-item">
            <label onClick={handleGameClick}>
                <div className="task-box">
                    <div className='sub-text'>{task.text}</div>
                </div>
                <RemoveOverlay />
            </label>
        </div>
            
      );
};