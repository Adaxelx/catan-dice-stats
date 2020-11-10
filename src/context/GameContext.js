import React, { createContext, useState } from "react";
import Cookies from "universal-cookie";
import { languages } from "constants/translations";

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
  const [language, setLanguage] = useState(languages.EN);

  const game = {
    throws,
    players,
    isStarted,
    isExtension,
    queue,
    isChanged,
    gameId,
    language,
    token: cookies.get("token"),
    setLanguage: (language) => {
      setLanguage(language);
    },
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
