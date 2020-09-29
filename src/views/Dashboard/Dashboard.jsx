import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { Board, StatsBoard, PlayersForm, PlayersStats } from "components";
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

  useEffect(() => {
    setStats(emptyDiceStats);
  }, []);

  const handleSaveToFile = async (e) => {
    setLoading(true);
    setError(false);
    e.preventDefault();
    const countOfDiceRolls = Object.keys(stats)
      .map((key) => stats[key])
      .reduce((acc, number) => acc + number, 0);
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

  return (
    <Container className="p-0">
      {isStarted ? (
        <>
          <PlayersStats players={players} />
          <StatsBoard stats={stats} history={history} />
          <Board stats={stats} setStats={setStats} setHistory={setHistory} />
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
          <PlayersForm setPlayers={setPlayers} />
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
