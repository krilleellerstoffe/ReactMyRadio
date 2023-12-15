import React from 'react';

export default function InputBox({text, update, save}) {


    return (
        
        <div>
            <input id="taskText" placeholder="Task description..." value={text} onChange={(event) => update(event.target.value)} type="text" />
            <button onClick={save}>Save task</button>
        </div>
            
      );
};