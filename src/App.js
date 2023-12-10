import React, { useState, useRef, useEffect } from "react";
import  "./App.css"
import GameList from "./GameList"

import SearchBox from "./SearchBox";
import AddOverlay from "./AddOverlay";

const LOCAL_STORAGE_KEY = 'gameDb.games'

function App() {

  const [games, setGames] = useState([])
  const [myGames, setMyGames] = useState([])
  const [listInistialised, initialiseList] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
  }, [myGames])

  //Add new favourite game to list
  function saveFavourite(id) {
    console.log("adding favourite" + id)
    const newFavouriteGame = games.find(game => game.id === id)
    setMyGames([...myGames, newFavouriteGame])
  }
  //Update list excluding removed game
  function removeFavourite(id) {
    console.log("removing favourite" + id)
    const newlist = myGames.filter(game => game.id !== id)
    setMyGames(newlist)
  }
  //Make a search for a game from the API
  const getGameRequest = async (page) => {
    var query = searchQuery
    const response = await fetch(`http://localhost:3001/api/search?query=${query}&page=${page}`);
    const responseJson = await response.json();
    if (responseJson.results) {
      setGames(responseJson.results)
      var remaining = responseJson.number_of_total_results - responseJson.number_of_page_results;
    }
  };
  //Trigger search when search field updated
  useEffect (() => {
    getGameRequest(1);
  }, [searchQuery])

  return (
    <>
      <div className="text-text"><h1>Welcome to your favourite Games!</h1></div>
      <div id="list">
        <div id="list-items">
          <GameList games={games} toggleFavourite={saveFavourite} overlay={AddOverlay}/>
        </div>
      </div>

      <div id="controls">
          <h2 className="sub-text">Search for new games</h2>
          <SearchBox query={searchQuery} search={setSearchQuery}/>
      </div>
      
      <div id="list">
        <div id="list-items">
          <h2 className="sub-text">Your favourites:</h2>
          <GameList games={myGames} toggleFavourite={removeFavourite}/>
        </div>
      </div>

      <div id="list-background-pattern"></div>
    </>
  );
  

}

export default App;
