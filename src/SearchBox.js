import React, { useState} from 'react';
import StationList from "./StationList"
import Pagination from "./Pagination"


export default function SearchBox({query, search, games, saveFavourite}) {

    const [buttonText, setButtonText] = useState('Add station')
    const [listVisible, setListVisible] = useState(false)
    const [filter, setFilter] = useState('');

    const handleClick = () => {
        if (!query) {
            setButtonText('Hide Stations')
            // Show the results list, but animate slowly
            setListVisible(true)
            const scrollDistance = 22;
            const totalScrolls = 20;
            const delayBetweenScrolls = 0;
            let scrollsCompleted = 0;
            const scrollStep = () => {
            if (scrollsCompleted < totalScrolls) {
                window.scrollBy({
                  top: scrollDistance,
                  behavior: 'smooth',
                });
                scrollsCompleted++;
                setTimeout(scrollStep, delayBetweenScrolls);
              }
            }
            scrollStep()

        } else {
            setButtonText('Add station')
            setListVisible(false)
        }
        search(!query);
    };

    const filteredList = () => {
        const filteredGames = games.filter(game => game.name.toLowerCase().includes(filter.toLowerCase()));
        return filteredGames;
    };

    const handleInputChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div>

            <div className="controls">
                <button id="showStationsBtn" onClick={handleClick}>{buttonText}</button>
            </div>

            {listVisible && (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <input type="text" value={filter} onChange={handleInputChange} placeholder="Search by station name"></input>
                    </div>
                    <div className="list">
                        {/* <Pagination currentPage={pageNumber} totalResults={totalResults} updatePage={setPageNumber} getPage={getGameRequest}/> */}
                        <div className="list-items">
                        <StationList games={filteredList()} favourite='false' toggleFavourite={saveFavourite}/>
                        </div>
                    </div>
                </div>
            )}
      </div>  
            
      );
};