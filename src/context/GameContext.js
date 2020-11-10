import React, { createContext, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const [throws, setThrows] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isExtension, setIsExtension] = useState(false);
  const [queue, setQueue] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [gameId, setGameId] = useState("");

  const game = {
    throws,
    players,
    isStarted,
    isExtension,
    queue,
    isChanged,
    gameId,
    token: cookies.get("token"),
    saveGameStats: ({
      throws,
      players,
      isStarted,
      isExtension,
      queue,
      gameId,
    }) => {
      console.log({
        throws,
        players,
        isStarted,
        isExtension,
        queue,
        gameId,
      });
      setThrows(throws);
      setPlayers(players);
      setIsExtension(isExtension);
      setIsStarted(isStarted);
      setQueue(queue);
      setGameId(gameId);
    },
    setChanged: (value) => setIsChanged(value),
  };

  return <GameContext.Provider value={game} {...props}></GameContext.Provider>;
};
