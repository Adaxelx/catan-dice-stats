import React, { useEffect, useState } from "react";
import { getHistory } from "functions";
import { GameHistory } from "components";
import { Alert } from "react-bootstrap";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await getHistory();
        setHistory(res);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const message = loading ? (
    <Alert variant="info">Ładowanie...</Alert>
  ) : error ? (
    <Alert variant="danger">Nie udało się załadować historii</Alert>
  ) : null;
  return <>{message || history.map((game) => <GameHistory game={game} />)}</>;
};

export default History;
