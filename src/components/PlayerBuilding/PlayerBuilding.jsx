import React from "react";
import { DiceThrowsStats, ResourcesStats } from "../";
import { Alert } from "react-bootstrap";
import { buildingsTypes } from "constants/diceNumbers";

const PlayerBuilding = ({ building }) => {
  const headerText =
    building.type === buildingsTypes[0] ? "zbudowana" : "zbudowane";
  return (
    <>
      <Alert variant="dark" className="text-dark mb-0 py-3">
        <h4>{`${building.type} ${headerText} w turze: ${building.buildedInThrow}`}</h4>
      </Alert>
      <ResourcesStats stats={building.resourcesStats} />
    </>
  );
};

export default PlayerBuilding;
