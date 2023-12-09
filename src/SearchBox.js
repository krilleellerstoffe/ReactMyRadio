import React from 'react';

export default function SearchBox({query, search}) {


    return (
        
        <div>
            <input placeholder="Type to search" value={query} onChange={(event) => search(event.target.value)} type="text" />
        </div>
            
      );
};