import React, { useEffect, useState } from "react";
import { getHistory } from "functions";

const History = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res);
      } catch (err) {}
    };
    fetchHistory();
  }, []);
  return <></>;
};

export default History;
