import React from "react";
import { Accordion, Card, Button, Alert } from "react-bootstrap";
import {
  StyledPlayer,
  StyledPlayerInfo,
  StyledBuildingsContainer,
  StyledBuilding,
  StyledBuildingTitle,
  StyledResources,
  StyledResource,
  StyledResourcesContainer,
} from "./ListOfPlayers.css";
import {
  resourcesExtension,
  resourcesArray,
  buildingsTypes,
} from "constants/diceNumbers";
import { useTranslation } from "hooks";

const ListOfPlayers = ({ players, setPlayers, isExtension }) => {
  const t = useTranslation();

  const handleDelete = (index) => {
    setPlayers((prevState) => {
      const tmp = [...prevState];
      const id = tmp.findIndex((item) => item.index === index);
      tmp.splice(id, 1);
      return tmp;
    });
  };

  const message = players.length ? null : (
    <Alert variant="info">Brak graczy</Alert>
  );

  const handleUpgradeBuilding = (building) => {
    const newBuilding = {
      ...building,
      type: buildingsTypes[1],
      resources: [...building.resources],
    };

    if (isExtension) {
      newBuilding.resources = building.resources
        .map((resource) => {
          if (resource.type === resourcesArray[1].name) {
            //sheep
            return [
              resource,
              { type: resourcesExtension[1].name, value: resource.value },
            ];
          } else if (resource.type === resourcesArray[3].name) {
            //lumber
            return [
              resource,
              { type: resourcesExtension[0].name, value: resource.value },
            ];
          } else if (resource.type === resourcesArray[4].name) {
            //ore
            return [
              resource,
              { type: resourcesExtension[2].name, value: resource.value },
            ];
          } else {
            return [resource, resource];
          }
        })
        .flat();
    } else {
      newBuilding.resources = [...building.resources, ...building.resources];
    }
    return newBuilding;
  };

  const handleDownGrade = (building) => {
    const newBuilding = {
      ...building,
      type: buildingsTypes[0],
      resources: [...building.resources],
    };

    console.log(newBuilding);

    if (isExtension) {
      newBuilding.resources = building.resources
        .filter(
          (val) =>
            resourcesExtension.findIndex(
              (resource) => resource.name === val.type
            ) === -1
        )
        .filter((elem, index, self) => {
          return index === self.indexOf(elem);
        });
    } else {
      newBuilding.resources = building.resources.filter((elem, index, self) => {
        return index === self.indexOf(elem);
      });
    }

    return newBuilding;
  };

  const handleDeleteBuiding = (player, building) => {
    const playersLocal = [...players];
    const playerIndex = playersLocal.findIndex(
      (playerLoc) => playerLoc.index === player
    );

    const buildingIndex = playersLocal[playerIndex].buildings.findIndex(
      (buildingLoc) => buildingLoc.id === building
    );

    playersLocal[playerIndex].buildings.splice(buildingIndex, 1);

    setPlayers(playersLocal);
  };

  const handleChange = (player, building, type) => {
    const playersLocal = [...players];
    const playerIndex = playersLocal.findIndex(
      (playerLoc) => playerLoc.index === player
    );

    const buildingIndex = playersLocal[playerIndex].buildings.findIndex(
      (buildingLoc) => buildingLoc.id === building
    );
    const buildingLocal = playersLocal[playerIndex].buildings[buildingIndex];

    let newBuilding;
    if (type === "upgrade") {
      newBuilding = handleUpgradeBuilding(buildingLocal);
    } else {
      newBuilding = handleDownGrade(buildingLocal);
    }
    playersLocal[playerIndex].buildings.splice(buildingIndex, 1, newBuilding);

    setPlayers(playersLocal);
  };

  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Lista graczy
          </Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey="0">
          <>
            {message ||
              players.map(({ name, index, buildings }, i) => {
                return (
                  <StyledPlayer
                    className="px-1 py-3"
                    key={index}
                    odd={!(i % 2)}
                  >
                    <StyledPlayerInfo>
                      <h4 className="mb-0">{name}</h4>
                      <p className="ml-2 mb-0">W kolejce: {index}</p>
                      <Button
                        className="ml-3"
                        onClick={() => handleDelete(index)}
                        variant="danger"
                      >
                        X
                      </Button>
                    </StyledPlayerInfo>
                    <StyledBuildingsContainer>
                      <h5>Budynki gracza:</h5>
                      {buildings.map(
                        ({ type, buildedInThrow, resources, id }) => (
                          <StyledBuilding>
                            <StyledBuildingTitle>
                              <span className="text-bold">{type}</span>
                              <span>{`${
                                type === buildingsTypes[0]
                                  ? " zbudowana w rzucie: "
                                  : " zbudowane w rzucie: "
                              }${buildedInThrow}`}</span>
                            </StyledBuildingTitle>
                            <StyledResources>
                              <h6>Pola do których ma dostęp:</h6>
                              <StyledResourcesContainer>
                                {resources.map(({ type, value }) => (
                                  <StyledResource>
                                    <p>{t(type)}</p>
                                    <p className="ml-1">przy: {value}</p>
                                  </StyledResource>
                                ))}
                              </StyledResourcesContainer>
                            </StyledResources>
                            {type === buildingsTypes[0] && (
                              <Button
                                onClick={() =>
                                  handleChange(index, id, "upgrade")
                                }
                              >
                                Rozbuduj
                              </Button>
                            )}
                            {type === buildingsTypes[1] && (
                              <Button
                                onClick={() =>
                                  handleChange(index, id, "downgrade")
                                }
                              >
                                Degraduj
                              </Button>
                            )}
                            <Button
                              variant="danger"
                              className="ml-4"
                              onClick={() => handleDeleteBuiding(index, id)}
                            >
                              X
                            </Button>
                          </StyledBuilding>
                        )
                      )}
                    </StyledBuildingsContainer>
                  </StyledPlayer>
                );
              })}
          </>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
export default ListOfPlayers;
