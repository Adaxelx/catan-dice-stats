import { buildingsTypes } from "constants/diceNumbers";
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

const ListOfPlayers = ({ players, setPlayers }) => {
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
                  <StyledPlayer key={index} odd={!i % 2}>
                    <StyledPlayerInfo>
                      <h4 className="mb-0">{name}</h4>
                      <p className="ml-2 mb-0">W kolejce: {index}</p>
                      <Button
                        className="ml-1"
                        onClick={() => handleDelete(index)}
                        variant="danger"
                      >
                        X
                      </Button>
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
