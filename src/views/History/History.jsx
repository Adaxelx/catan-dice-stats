import React, { useEffect, useState, useContext } from "react";
import { getHistory } from "functions";
import { GameHistory, Pagination } from "components";
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { GameContext } from "context";
import { useTranslation } from "hooks";

const History = () => {
  const t = useTranslation();
  const [history, setHistory] = useState([]);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const gameContext = useContext(GameContext);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await getHistory(gameContext.token, page);
        setHistory(res.data);
        setCount(res.count);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [gameContext.token, page]);

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    queryParams.page &&
    typeof parseInt(queryParams.page, 10) === "number" &&
    queryParams.page !== page
  ) {
    setPage(queryParams.page);
  }

  const message = loading ? (
    <Alert variant="info">{t("Loading...")}</Alert>
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : count === 0 ? (
    <Alert variant="info">{t("You do not have any games")}</Alert>
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
