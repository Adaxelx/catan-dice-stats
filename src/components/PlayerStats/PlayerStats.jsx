import React from "react";
import { DiceThrowsStats, ResourcesStats, PlayerBuilding } from "../";
import { Alert } from "react-bootstrap";
import { useTranslation } from "hooks";

const PlayerStats = ({ player }) => {
  const t = useTranslation();
  return (
    <>
      <Alert className="mb-0  mt-3 py-4 h4 text-warning bg-primary  text-center">{`${t(
        "Player stats:"
      )} ${player.name}`}</Alert>
      <DiceThrowsStats
        stats={player.stats}
        countOfDiceRolls={Object.keys(player.stats)
          .map((key) => player.stats[key])
          .reduce((acc, value) => acc + value, 0)}
      />
      <ResourcesStats stats={player.resourcesStats} />
      <Alert
        variant="dark"
        className="text-primary bg-warning mb-0 py-4 h4 text-center"
      >{`${t("Player buildings")} ${player.name}`}</Alert>
      {player.buildings.map((building) => (
        <PlayerBuilding building={building} key={building._id} />
      ))}
    </>
  );
};

export default PlayerStats;
