import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Board, StatsBoard } from "components";
import diceNumbers from "constants/diceNumbers";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const object = {};
    diceNumbers.map((value) => (object[value] = 0));
    setStats(object);
  }, []);

  return (
    <Container className="p-0">
      <StatsBoard stats={stats} />
      <Board stats={stats} setStats={setStats} />
      <Button variant="primary" onClick={() => {}}>
        Zapisz do pliku
      </Button>
    </Container>
  );
};

export default Dashboard;