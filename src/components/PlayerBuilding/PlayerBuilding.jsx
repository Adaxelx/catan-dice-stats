import React from "react";
import { ResourcesStats } from "../";
import { Alert } from "react-bootstrap";
import { useTranslation } from "hooks";

const PlayerBuilding = ({ building }) => {
  const t = useTranslation();
  return (
    <>
      <Alert variant="dark" className="text-dark mb-0 py-3">
        <h4>{`${t(building.type)} ${t("builded in tour")} ${
          building.buildedInThrow
        }`}</h4>
      </Alert>
      <div className="py-2">
        <h4 className="text-center">{`${t("Resources by building")}:`}</h4>
        <div className="px-3">
          {building.resources.map((resource) => (
            <span key={resource._id} className="mr-1">{`${t(resource.type)} ${
              resource.value
            }`}</span>
          ))}
        </div>
      </div>
      <ResourcesStats stats={building.resourcesStats} />
    </>
  );
};

export default PlayerBuilding;
