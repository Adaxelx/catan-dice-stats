import React, { useState } from "react";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import diceNumbers, {
  resourcesArray,
  buildingsTypes,
  resources,
} from "constants/diceNumbers";
import { StyledBoard, StyledTile } from "../Board/Board.css";
import {
  StyledResource,
  StyledReourcesContainer,
  StyledBox,
} from "./CardForm.css";
import { useTranslation } from "hooks";

const CardForm = ({ isExtension, players, setPlayers, throws }) => {
  const t = useTranslation();

  const [validated, setValidated] = useState(false);

  const [type, setType] = useState(buildingsTypes[0]);
  const [resource, setResource] = useState(resourcesArray[0].name);
  const [value, setValue] = useState(diceNumbers[0]);
  const [player, setPlayer] = useState(players[0].index);

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
          (playerArr) => parseInt(player, 10) === playerArr.index
        );

        array[index] = {
          ...array[index],
          buildings: [
            ...array[index].buildings,
            {
              resources: localResources,
              type,
              buildedInThrow: throws.length,
              id: array[index].buildings.length,
            },
          ],
        };
        return array;
      });
      setLocalResources([]);
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  const handlePlayerChange = (e) => {
    const value = e.target.value;

    setPlayer(value);
  };

  const handleSettlement = (resource, type) => {
    if (type === buildingsTypes[0]) {
      setLocalResources((prevState) => [
        ...prevState,
        { type: resource, value, index: prevState.length },
      ]);
    } else if (type === buildingsTypes[1] && !isExtension) {
      setLocalResources((prevState) => [
        ...prevState,
        { type: resource, value, index: prevState.length },
        { type: resource, value, index: prevState.length },
      ]);
    } else {
      if (resource === resources.BRICK || resource === resources.GRAIN) {
        setLocalResources((prevState) => [
          ...prevState,
          { type: resource, value, index: prevState.length },
          { type: resource, value, index: prevState.length },
        ]);
      }
    }
  };

  const handleCity = () => {
    switch (resource) {
      case resources.LUMBER:
        setLocalResources((prevState) => [
          ...prevState,
          { type: resource, value, index: prevState.length },
          { type: resources.PAPER, value, index: prevState.length },
        ]);
        break;
      case resources.SHEEP:
        setLocalResources((prevState) => [
          ...prevState,
          { type: resource, value, index: prevState.length },
          { type: resources.CLOTH, value, index: prevState.length },
        ]);
        break;
      case resources.ORE:
        setLocalResources((prevState) => [
          ...prevState,
          { type: resource, value, index: prevState.length },
          { type: resources.COIN, value, index: prevState.length },
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
            {t("Add building")}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0" as={Card.Body}>
          <Form validated={validated} noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>{t("Choose type of building")}</Form.Label>
              <Form.Control
                as="select"
                required
                value={type}
                onChange={handleChange}
              >
                {buildingsTypes.map((typeVal) => (
                  <option value={typeVal} key={typeVal}>
                    {t(typeVal)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>{t("Choose player")}</Form.Label>
              <Form.Control
                as="select"
                required
                value={player}
                onChange={handlePlayerChange}
              >
                {players.map(({ name, index }) => (
                  <option value={index} key={index}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <StyledReourcesContainer>
              {resourcesArray.map(({ name, image }) => (
                <StyledBox
                  key={name}
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
                  onClick={number === 7 ? () => {} : () => setValue(number)}
                  key={number}
                  disabled={number === 7}
                >
                  {number}
                </StyledTile>
              ))}
            </StyledBoard>
            <p>{t("Actually added resources:")}</p>
            <div className="d-flex">
              {localResources.map(({ type, value }, i) => (
                <p className="mr-1" key={type + value + i}>
                  {t(type)} {value}
                </p>
              ))}
            </div>
            <Button onClick={handleLocalAdd}>{t("Add resource")}</Button>
            <Button onClick={() => setLocalResources([])} className="mx-1">
              {t("Reset")}
            </Button>
            <Button type="submit">{t("Add building")}</Button>
          </Form>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default CardForm;
