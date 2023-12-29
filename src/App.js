import React, { useState, useEffect } from "react";
import  "./App.css"
import StationList from "./StationList"
import Pagination from "./Pagination"
import SearchBox from "./SearchBox";
import NowPlayingList from "./NowPlayingList";

const LOCAL_STORAGE_KEY = 'mySR.channels'

function App() {

  const [games, setGames] = useState([])
  const [myGames, setMyGames] = useState([])
  const [listInistialised, initialiseList] = useState(false)
  const [searchQuery, setSearchQuery] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  //First load any saved list from local storage
  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedGames) {
      console.log("loading")
      setMyGames(storedGames)
    }
    initialiseList(true)
  }, [])

  //If list changed, store the change to local storage (only if initial loading done)
  useEffect(() => {
    if(listInistialised) {
      console.log("saving")
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myGames))
    }
  }, [myGames, listInistialised])

  //Add new favourite game to list
  function saveFavourite(id) {
    console.log("adding favourite" + id)
    const newFavouriteGame = games.find(game => game.id === id)

    if(!myGames.some(game => game.id === id)) {
      setMyGames([...myGames, newFavouriteGame])
    } else {
      alert(`${newFavouriteGame.name} is already in your favorites`);
    }
  }
  //Update list excluding removed station
  function removeFavourite(id) {
    console.log("removing favourite" + id)
    const newlist = myGames.filter(game => game.id !== id)
    setMyGames(newlist)
  }

  const getGameRequest = async () => {

    const url = `https://api.sr.se/api/v2/channels/?format=json&pagination=false`;
    console.log(url)
    const response = await fetch(url);
    const responseJson = await response.json()
    console.log(responseJson)
    if (responseJson.channels) {
      setGames(responseJson.channels)
    }
  }
  //Trigger search when search div activated
  useEffect (() => {
    if (searchQuery) {
        getGameRequest();
    }
  }, [searchQuery])

  return (
    <>
      <div className="text-text"><h1>Welcome to your radio stations!</h1></div>

      <div className="now-playing-list" >
        <div>
          <h2 className="sub-text">Now playing:</h2>
          <NowPlayingList games={myGames}/>
        </div>
      </div>

      <div className="list">
        <div className="list-items">
          <h2 className="sub-text">Your favourites:</h2>
          <StationList games={myGames} favourite='true' toggleFavourite={removeFavourite}/>
        </div>
      </div>
      
      <SearchBox query={searchQuery} search={setSearchQuery} games={games} saveFavourite={saveFavourite}/>
      
      <div id="background-pattern"></div>

    </>
  );
  

}

export default App;
