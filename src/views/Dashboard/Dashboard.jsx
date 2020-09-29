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
  const [stats, setStats] = useState({});
  const [history, setHistory] = useState([]);
  const [players, setPlayers] = useState([]);

  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const countOfDiceRolls = useMemo(
    () =>
      Object.keys(stats)
        .map((key) => stats[key])
        .reduce((acc, number) => acc + number, 0),
    [stats]
  );

  useEffect(() => {
    setStats(emptyDiceStats);
  }, []);

  console.log(players);

  const handleSaveToFile = async (e) => {
    setLoading(true);
    setError(false);
    e.preventDefault();

    try {
      const response = await saveFile({
        stats,
        countOfDiceRolls,
        history,
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

  const queue = useMemo(
    () => Math.floor(countOfDiceRolls / players.length) + 1,
    [countOfDiceRolls, players.length]
  );

  const activePlayer = useMemo(() => {
    return players.find(
      (player) => player.index - 1 === countOfDiceRolls % players.length
    );
  }, [countOfDiceRolls, players]);

  return (
    <Container className="p-0">
      {isStarted ? (
        <>
          <h3>{`Kolejka ${queue}, gracz ${activePlayer.name}`}</h3>
          <PlayersStats players={players} />
          <StatsBoard stats={stats} history={history} />
          <Board
            stats={stats}
            setStats={setStats}
            setHistory={setHistory}
            setPlayers={setPlayers}
            activePlayer={activePlayer}
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
          <PlayersList players={players} setPlayers={setPlayers} />
          <PlayersForm setPlayers={setPlayers} players={players} />
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => setIsStarted(true)}
          >
            Zacznij gre
          </Button>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
