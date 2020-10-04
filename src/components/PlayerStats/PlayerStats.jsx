import React from "react";
import { DiceThrowsStats, ResourcesStats } from "../";
import { Alert } from "react-bootstrap";

const PlayerStats = ({ player }) => {
  console.log(player);
  return (
    <>
      <Alert
        variant="success"
        className="mb-0"
      >{`Statystki gracza ${player.name}`}</Alert>
      <DiceThrowsStats
        stats={player.stats}
        countOfDiceRolls={Object.keys(player.stats)
          .map((key) => player.stats[key])
          .reduce((acc, value) => acc + value, 0)}
      />
      <ResourcesStats stats={player.resourcesStats} />
    </>
  );
};

export default PlayerStats;
