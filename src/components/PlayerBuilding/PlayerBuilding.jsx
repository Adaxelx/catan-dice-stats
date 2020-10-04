import React from "react";
import { DiceThrowsStats, ResourcesStats } from "../";

const PlayerBuilding = ({ building }) => {
  console.log(building);
  return (
    <>
      <h4 className="text-primary text-center">{`${building.type} zbudowana w turze: ${building.buildedInThrow}`}</h4>
      <ResourcesStats stats={building.resourcesStats} />
    </>
  );
};

export default PlayerBuilding;
