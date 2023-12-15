import React, { useState } from 'react';
import Task from './Task';

export default function TaskList({tasks, remove}) {

    return (
        tasks.map(task => {
            return <Task key={task.id} task={task} remove={remove}/>
        })
            
      );
};