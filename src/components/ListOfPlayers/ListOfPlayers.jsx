import { buildingsTypes } from "constants/diceNumbers";
import React from "react";
import { Accordion, Card } from "react-bootstrap";
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

const ListOfPlayers = ({ players, setPlayers }) => {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Lista użytkowników
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <>
            {players.map(({ name, index, buildings }) => {
              return (
                <StyledPlayer>
                  <StyledPlayerInfo>
                    <h4 className="mb-0">{name}</h4>
                    <p className="ml-2 mb-0">W kolejce: {index}</p>
                  </StyledPlayerInfo>
                  <StyledBuildingsContainer>
                    <h5>Budynki gracza:</h5>
                    {buildings.map(({ type, buildedInThrow, resources }) => (
                      <StyledBuilding>
                        <StyledBuildingTitle>
                          <span className="text-bold">{type}</span>
                          <span>{`${
                            type === buildingsTypes[0]
                              ? " zbudowana w turze: "
                              : " zbudowane w turze: "
                          }${buildedInThrow}`}</span>
                        </StyledBuildingTitle>
                        <StyledResources>
                          <h6>Pola do których ma dostęp:</h6>
                          <StyledResourcesContainer>
                            {resources.map(({ type, value }) => (
                              <StyledResource>
                                <p>{type}</p>
                                <p className="ml-1">przy: {value}</p>
                              </StyledResource>
                            ))}
                          </StyledResourcesContainer>
                        </StyledResources>
                      </StyledBuilding>
                    ))}
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
