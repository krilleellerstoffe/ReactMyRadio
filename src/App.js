import React, { useState, useEffect } from "react";
import  "./App.css"
import StationList from "./StationList"
import Pagination from "./Pagination"
import SearchBox from "./SearchBox";
import NowPlayingList from "./NowPlayingList";

const LOCAL_STORAGE_KEY = 'mySR.channels'

function App() {

  const [stations, setStations] = useState([])
  const [myStations, setMyStations] = useState([])
  const [listInistialised, initialiseList] = useState(false)
  const [searchQuery, setSearchQuery] = useState(false)
  //Keep track of results and pages if using pagination
  const [totalResults, setTotalResults] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  //First load any saved list from local storage
  useEffect(() => {
    const storedStations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedStations) {
      setMyStations(storedStations)
    }
    initialiseList(true)
  }, [])

  //If list changed, store the change to local storage (only if initial loading done)
  useEffect(() => {
    if(listInistialised) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myStations))
    }
  }, [myStations, listInistialised])

  //Add new favourite 
  function saveFavourite(id) {
    const newFavouriteStation = stations.find(station => station.id === id)

    if(!myStations.some(station => station.id === id)) {
      setMyStations([...myStations, newFavouriteStation])
    } else {
      alert(`${newFavouriteStation.name} is already in your favorites`);
    }
  }

  //Remove a favourite
  function removeFavourite(id) {
    const newlist = myStations.filter(station => station.id !== id)
    setMyStations(newlist)
  }

  //Search for radio stations
  const searchForStations = async () => {

    const url = `https://api.sr.se/api/v2/channels/?format=json&pagination=false`;
    const response = await fetch(url);
    const responseJson = await response.json()
    if (responseJson.channels) {
      setStations(responseJson.channels)
    }
  }

  //Trigger search when search div activated
  useEffect (() => {
    if (searchQuery) {
        searchForStations(); 
    }
  }, [searchQuery])

  return (
    <>
      <div className="text-text"><h1>Welcome to your radio stations!</h1></div>

      <div className="now-playing-list" >
        <div>
          <h2 className="sub-text">Now playing:</h2>
          <NowPlayingList stations={myStations}/>
        </div>
      </div>

      <div className="list">
        <div className="list-items">
          <h2 className="sub-text">Your favourites:</h2>
          <StationList stations={myStations} favourite='true' toggleFavourite={removeFavourite}/>
        </div>
      </div>
      
      <SearchBox query={searchQuery} search={setSearchQuery} stations={stations} saveFavourite={saveFavourite}/>
      
      <div id="background-pattern"></div>

    </>
  );
  

}

export default App;
