import React, { useEffect, useState } from "react";
import { getHistory } from "functions";
import { GameHistory, Pagination } from "components";
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import qs from "query-string";

const History = () => {
  const [history, setHistory] = useState([]);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await getHistory(page);
        setHistory(res.data);
        setCount(res.count);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [page]);

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    queryParams.page &&
    typeof parseInt(queryParams.page, 10) === "number" &&
    queryParams.page !== page
  ) {
    setPage(queryParams.page);
  }

  const message = loading ? (
    <Alert variant="info">Ładowanie...</Alert>
  ) : error ? (
    <Alert variant="danger">Nie udało się załadować historii</Alert>
  ) : count === 0 ? (
    <Alert variant="info">Brak gier</Alert>
  ) : null;

  return (
    <>
      {message ||
        history.map((game) => <GameHistory key={game._id} game={game} />)}
      <Pagination current={page} max={Math.ceil(count / 10)} />
    </>
  );
};

export default History;
