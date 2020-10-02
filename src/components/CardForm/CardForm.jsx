import React, { useState } from "react";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import diceNumbers, {
  resourcesArray,
  resourcesExtension,
  buildingsTypes,
  resources,
} from "constants/diceNumbers";
import { StyledBoard, StyledTile } from "../Board/Board.css";
import {
  StyledResource,
  StyledReourcesContainer,
  StyledBox,
} from "./CardForm.css";
import { FormGroup } from "../";

const CardForm = ({ isExtension, players, setPlayers, throws }) => {
  const [validated, setValidated] = useState(false);

  const [type, setType] = useState(buildingsTypes[0]);
  const [resource, setResource] = useState(resourcesArray[0].name);
  const [value, setValue] = useState(diceNumbers[0]);
  const [player, setPlayer] = useState(players[0]);

  const [localResources, setLocalResources] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setPlayers((prevState) => {
        const array = [...prevState];
        const index = array.findIndex(
          (playerArr) => player.index === playerArr.index
        );
        array[index] = {
          ...array[index],
          buildings: [
            ...array[index].buildings,
            { resources: localResources, type, buildedInThrow: throws.length },
          ],
        };
        return array;
      });
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  const handleSettlement = (resource, type) => {
    if (type === buildingsTypes[0]) {
      setLocalResources((prevState) => [
        ...prevState,
        { type: resource, value },
      ]);
    } else if (type === buildingsTypes[1] && !isExtension) {
      setLocalResources((prevState) => [
        ...prevState,
        { type: resource, value },
        { type: resource, value },
      ]);
    } else {
      if (resource === resources.BRICK || resource === resources.GRAIN) {
        setLocalResources((prevState) => [
          ...prevState,
          { type: resource, value },
          { type: resource, value },
        ]);
      }
    }
  };

  const handleCity = () => {
    switch (resource) {
      case resources.LUMBER:
        setLocalResources((prevState) => [
          ...prevState,
          { type: resource, value },
          { type: resources.PAPER, value },
        ]);
        break;
      case resources.SHEEP:
        setLocalResources((prevState) => [
          ...prevState,
          { type: resource, value },
          { type: resources.CLOTH, value },
        ]);
        break;
      case resources.ORE:
        setLocalResources((prevState) => [
          ...prevState,
          { type: resource, value },
          { type: resources.COIN, value },
        ]);
        break;
      default:
        return;
    }
  };

  const handleLocalAdd = () => {
    if (
      type === buildingsTypes[1] &&
      isExtension &&
      localResources.length <= 4
    ) {
      handleSettlement(resource, type);
      handleCity();
    } else if (type === buildingsTypes[1] && localResources.length <= 4) {
      handleSettlement(resource, type);
    } else if (type === buildingsTypes[0] && localResources.length <= 2) {
      handleSettlement(resource, type);
    }
  };

  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Dodaj surowce
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Form validated={validated} noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Wybierz typ budowli</Form.Label>
              <Form.Control
                as="select"
                required
                value={type}
                onChange={handleChange}
              >
                {buildingsTypes.map((typeVal) => (
                  <option value={typeVal}>{typeVal}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Wybierz gracza</Form.Label>
              <Form.Control as="select" required>
                {players.map(({ name, index }) => (
                  <option value={index}>{name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <StyledReourcesContainer isExtension={isExtension}>
              {resourcesArray.map(({ name, image }) => (
                <StyledBox
                  isActive={resource === name}
                  onClick={() => setResource(name)}
                >
                  <StyledResource src={image} alt="surowiec" />
                </StyledBox>
              ))}
            </StyledReourcesContainer>
            <StyledBoard>
              {diceNumbers.map((number) => (
                <StyledTile
                  isActive={value === number}
                  onClick={() => setValue(number)}
                  key={number}
                  disabled={number === 7}
                >
                  {number}
                </StyledTile>
              ))}
            </StyledBoard>
            <p>Aktualnie dodane surowce:</p>
            {localResources.map(({ type, value }) => (
              <p>
                {type} {value}
              </p>
            ))}
            <Button onClick={handleLocalAdd}>Dodaj surowiec</Button>
            <Button onClick={() => setLocalResources([])}>Resetuj</Button>
            <Button type="submit">Dodaj budowle</Button>
          </Form>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default CardForm;
