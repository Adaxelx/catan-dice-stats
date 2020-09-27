import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Board, StatsBoard } from "components";
import diceNumbers from "constants/diceNumbers";
import fs from "fs";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const object = {};
    diceNumbers.map((value) => (object[value] = 0));
    setStats(object);
  }, []);

  //   const handleSaveToFile = async () => {
  //     const date = new Date();
  //     console.log(fs);
  //     // await fs.writeFile(
  //     //   `data/catan-${date.toLocaleDateString("pl-PL")}.json`,
  //     //   JSON.stringify(stats)
  //     // );
  //   };

  return (
    <Container className="p-0">
      <StatsBoard stats={stats} />
      <Board stats={stats} setStats={setStats} />
      <Button variant="primary" onClick={handleSaveToFile}>
        Zapisz do pliku
      </Button>
    </Container>
  );
};

export default Dashboard;
