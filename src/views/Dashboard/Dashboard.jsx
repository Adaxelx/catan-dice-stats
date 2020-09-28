import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { Board, StatsBoard } from "components";
import diceNumbers from "constants/diceNumbers";
import { saveFile } from "functions";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const object = {};
    diceNumbers.map((value) => (object[value] = 0));
    setStats(object);
  }, []);

  const handleSaveToFile = async (e) => {
    e.preventDefault();
    try {
      const response = await saveFile(stats);
      setSuccess(response.message);
    } catch (err) {
      setError(true);
    }
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
      <StatsBoard stats={stats} />
      <Board stats={stats} setStats={setStats} />
      {message}
      <Button disabled={loading} variant="primary" onClick={handleSaveToFile}>
        Zapisz do pliku
      </Button>
    </Container>
  );
};

export default Dashboard;
