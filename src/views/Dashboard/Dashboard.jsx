import React, { useState, useEffect, useMemo } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import {
  Board,
  StatsBoard,
  PlayersForm,
  PlayersStats,
  PlayersList,
} from "components";
import { emptyDiceStats } from "constants/diceNumbers";
import { saveFile } from "functions";

const Dashboard = () => {
  const [throws, setThrows] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSaveToFile = async (e) => {
    setLoading(true);
    setError(false);
    e.preventDefault();

    try {
      const response = await saveFile({
        throws,
      });
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

  const queue = useMemo(() => Math.floor(throws.length / players.length) + 1, [
    players.length,
    throws.length,
  ]);

  const activePlayer = useMemo(() => {
    return players.find(
      (player) => player.index - 1 === throws.length % players.length
    );
  }, [players, throws.length]);

  return (
    <Container className="p-0">
      {isStarted ? (
        <>
          <h3>{`Kolejka ${queue}, gracz ${activePlayer.name}`}</h3>
          <PlayersStats players={players} />
          <StatsBoard throws={throws} />
          <Board setThrows={setThrows} activePlayer={activePlayer} />
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
          <PlayersList players={players} setPlayers={setPlayers} />
          <PlayersForm setPlayers={setPlayers} players={players} />
          {!!players.length && (
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => setIsStarted(true)}
            >
              Zacznij gre
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
