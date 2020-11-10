import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { Container, Button, Alert, Form } from "react-bootstrap";
import {
  Board,
  StatsBoard,
  PlayersForm,
  CardForm,
  ListOfPlayers,
  GameHistory,
} from "components";

import { saveFile, generateStats } from "functions";
import { GameContext } from "context";

const Dashboard = () => {
  const [throws, setThrows] = useState([]);
  const [players, setPlayers] = useState([]);
  const [queue, setQueue] = useState([]);

  const [isStarted, setIsStarted] = useState(false);
  const [isExtension, setIsExtension] = useState(false);

  const [gameId, setGameId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLocallySaved, setIsLocallySaved] = useState(false);

  const [localStats, setLocalStats] = useState(null);

  const gameContext = useContext(GameContext);

  const handleSaveToFile = useCallback(async () => {
    if (gameContext.token) {
      setLoading(true);
      setError(false);
      const throwsApi = throws.map((throwDice) => ({
        ...throwDice,
        player:
          typeof throwDice.player === "number"
            ? throwDice.player
            : throwDice.player.index,
      }));

      try {
        const response = await saveFile(
          gameContext.token,
          {
            throws: throwsApi,
            players: players,
            isExtension,
          },
          gameId
        );
        setGameId(response.id);
        setSuccess(response.message);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
  }, [gameContext.token, gameId, isExtension, players, throws]);

  useEffect(() => {
    const {
      throws,
      players,
      isStarted,
      isExtension,
      queue,
      gameId,
    } = gameContext;
    setThrows(throws);
    setPlayers(players);
    setIsStarted(isStarted);
    setIsExtension(isExtension);
    setQueue(queue);
    setGameId(gameId);
  }, [gameContext]);

  const handleSaveData = () => {
    gameContext.saveGameStats({
      throws,
      players,
      isStarted,
      isExtension,
      queue,
      gameId,
    });
    setIsLocallySaved(true);
  };

  const handleSaveToFileClick = async (e) => {
    e.preventDefault();
    handleSaveToFile();
  };

  const message = loading ? (
    <Alert variant="info">Trwa przesyłanie...</Alert>
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : success ? (
    <Alert variant="success">{success}</Alert>
  ) : null;

  const queueCount = useMemo(
    () => Math.floor(throws.length / queue.length) + 1,
    [queue.length, throws.length]
  );

  const activePlayer = useMemo(() => {
    return queue[throws.length % queue.length];
  }, [queue, throws.length]);

  const handleStart = () => {
    const queue = [];
    if (isExtension) {
      players.forEach((player) => {
        queue.push(player);
        queue.push(player);
      });
    } else {
      players.forEach((player) => {
        queue.push(player);
      });
    }
    setQueue(queue);
    setIsStarted(true);
  };

  const handleGenerateStats = async () => {
    setLoading(true);
    const throwsApi = throws.map((throwDice) => ({
      ...throwDice,
      player:
        typeof throwDice.player === "number"
          ? throwDice.player
          : throwDice.player.index,
    }));
    try {
      const response = await generateStats({
        throws: throwsApi,
        players: players,
        isExtension,
      });
      setLocalStats(response);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Container className="p-0">
      <ListOfPlayers
        players={players}
        setPlayers={setPlayers}
        isExtension={isExtension}
      />
      {!!players.length && (
        <CardForm
          throws={throws}
          isExtension={isExtension}
          players={players}
          setPlayers={setPlayers}
        />
      )}
      {isStarted ? (
        <>
          <h3>{`Kolejka ${queueCount}, gracz ${activePlayer.name} ${
            isExtension
              ? !(throws.length % 2)
                ? "rzut kostką z liczbami"
                : "rzut kostką wydarzeń"
              : ""
          }`}</h3>
          <StatsBoard
            throws={throws}
            isExtension={isExtension}
            players={players}
          />
          <Board
            throws={throws}
            setThrows={setThrows}
            activePlayer={activePlayer}
            isExtension={isExtension}
            handleSaveToFile={handleSaveToFile}
          />
          {message}
          {gameContext.token && (
            <Button
              disabled={loading}
              variant="primary"
              className="d-block mt-3"
              onClick={handleSaveToFileClick}
            >
              Zapisz do pliku
            </Button>
          )}
          {!gameContext.token && (
            <Button
              variant="primary"
              className="mt-3"
              onClick={handleGenerateStats}
            >
              Generuj statystyki gry
            </Button>
          )}
          {localStats && <GameHistory game={localStats} load={false} />}
        </>
      ) : (
        <>
          <PlayersForm setPlayers={setPlayers} players={players} />
          <Form.Check
            type="switch"
            label="Dodatek: Miasta i rycerze"
            id="disabled-custom-switch"
            className="mt-3"
            value={isExtension}
            onClick={() => setIsExtension((prevState) => !prevState)}
          />
          {!!players.length && (
            <Button
              variant="secondary"
              className="mt-3 d-block"
              onClick={handleStart}
            >
              Zacznij gre
            </Button>
          )}
        </>
      )}
      {isLocallySaved && (
        <Alert variant="success" className="mt-3">
          Poprawnie zapisano dane
        </Alert>
      )}
      {gameContext.token && (
        <Button variant="primary" className="mt-3" onClick={handleSaveData}>
          Zapisz dane jeśli chcesz sprawdzić historię gry
        </Button>
      )}
    </Container>
  );
};

export default Dashboard;
