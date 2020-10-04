import React, { useState, useEffect, useMemo, useContext } from "react";
import { Container, Button, Alert, Form } from "react-bootstrap";
import {
  Board,
  StatsBoard,
  PlayersForm,
  PlayersStats,
  CardForm,
  ListOfPlayers,
} from "components";
import { emptyDiceStats } from "constants/diceNumbers";
import { saveFile } from "functions";
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

  const gameContext = useContext(GameContext);

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

  const handleSaveToFile = async (e) => {
    setLoading(true);
    setError(false);
    e.preventDefault();
    const throwsApi = throws.map((throwDice) => ({
      ...throwDice,
      player: throwDice.player.index,
    }));

    try {
      const response = await saveFile(
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
      setError(true);
    }
    setLoading(false);
  };

  const message = loading ? (
    <Alert variant="info">Trwa przesyłanie...</Alert>
  ) : error ? (
    <Alert variant="danger">Błąd przesyłania</Alert>
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
      players.map((player) => {
        queue.push(player);
        queue.push(player);
      });
    } else {
      players.map((player) => {
        queue.push(player);
      });
    }
    setQueue(queue);
    setIsStarted(true);
  };

  return (
    <Container className="p-0">
      <ListOfPlayers players={players} setPlayers={setPlayers} />
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
          <PlayersStats players={players} />
          <StatsBoard throws={throws} isExtension={isExtension} />
          <Board
            throws={throws}
            setThrows={setThrows}
            activePlayer={activePlayer}
            isExtension={isExtension}
          />
          {message}
          <Button
            disabled={loading}
            variant="primary"
            onClick={handleSaveToFile}
          >
            Zapisz do pliku
          </Button>
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
            <Button variant="secondary" className="mt-3" onClick={handleStart}>
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
      <Button variant="primary" className="mt-3" onClick={handleSaveData}>
        Zapisz dane jeśli chcesz sprawdzić historię gry
      </Button>
    </Container>
  );
};

export default Dashboard;
