import React, { useState, useRef, useEffect } from "react";
import  "./App.css"
import GameList from "./GameList"

import SearchBox from "./SearchBox";

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
      setMyGames(storedGames)
      initialiseList(true)
    }
  }, [])
  //If list changed, store the change to local storage (only if initial loading done)
  useEffect(() => {
    if(listInistialised) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myGames))
    }
  }, [myGames])


  function saveFavourite(id) {
    const game = games.find(game => game.id === id)
    setMyGames([...myGames], game)
  }

  const getGameRequest = async (page) => {
    var query = searchQuery + 'page=' + page
    const response = await fetch(`http://localhost:3001/api/search?query=${query}`);
    const responseJson = await response.json();
    if (responseJson.results) {
      setGames(responseJson.results)
      var remaining = responseJson.number_of_total_results - responseJson.number_of_page_results;
      
    }
  };


  useEffect (() => {
    getGameRequest(1);
  }, [searchQuery])

  return (
    <>
      <div className="text-text"><h1>Welcome to your favourite Games!</h1></div>

      <div id="list">
        <div id="list-items">

          <GameList games={games} toggleFavourite={saveFavourite}/>
        </div>
      </div>
      <div id="controls">

          <SearchBox query={searchQuery} search={setSearchQuery}/>
       
      </div>

      <div id="list-background-pattern"></div>
      <div id="list-background-image"></div>
    </>
  );
  

}

export default App;
