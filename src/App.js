import React, { useState, useRef, useEffect } from "react";
import  "./App.css"
import GameList from "./GameList"

const LOCAL_STORAGE_KEY = 'gameDb.games'

function App() {

  const [games, setGames] = useState([])
  const [listInistialised, initialiseList] = useState(false)
  const gameNameRef = useRef()

  //First load any saved list from local storage
  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedGames) {
      setGames(storedGames)
      initialiseList(true)
    }
  }, [])
  //If list changed, store the change to local storage (only if initial loading done)
  useEffect(() => {
    if(listInistialised) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games))
    }
  }, [games])

  function generateUniqueId() {
    return '_' + Math.random().toString(36)// Example of a simple unique ID generation
  }

  function toggleFavourite(id) {
    const newGames = [...games]
    const game = newGames.find(game => game.id === id)
    game.favourite = !game.favourite
    setGames(newGames)
  }

  function handleSearchGame(event) {

  }

  function handleAddGame(event) {
    const title = gameNameRef.current.value
    if (title === '') return
    console.log(title)
    setGames(oldGames => {
      const newGame = { id: generateUniqueId(), title: title, favourite: false };
      return [...oldGames, newGame]
    })
    gameNameRef.current.value = ''

  }

  function handleRemoveMarked() {
    const newGames = games.filter(game => !game.favourite)
    setGames(newGames)
  }


  return (
    <>
      <div className="text-text"><h1>Welcome to your favourite Games!</h1></div>

      <div id="list">
        <div id="list-items">

          <GameList games={games} toggleFavourite={toggleFavourite}/>
        </div>
      </div>
      <div id="controls">

          <input ref={gameNameRef} type="text" />
          <button onClick={handleSearchGame}> Find Game</button>
          <button onClick={handleAddGame}> Add Game</button>
          <button onClick={handleRemoveMarked}> Remove Marked</button>
          <div className="text-text">{games.filter(game => game.favourite).length} Favourite games</div>
       
      </div>

      <div id="list-background-pattern"></div>
      <div id="list-background-image"></div>
    </>
  );
  

}

export default App;
