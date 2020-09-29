import React, { useState } from "react";
import { Form, InputGroup, Col, Button } from "react-bootstrap";
import { emptyDiceStats } from "constants/diceNumbers";
import { FormGroup } from "../";

const PlayersForm = ({ setPlayers }) => {
  const [validated, setValidated] = useState("");
  const [name, setName] = useState("");
  const [index, setIndex] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setPlayers((prevState) => {
        const prevArray = [
          ...prevState,
          { name, index, stats: emptyDiceStats },
        ];
        prevArray.sort((a, b) => a.index - b.index);
        return prevArray;
      });
    }
    setValidated(true);
  };
  return (
    <Form validated={validated} noValidate onSubmit={handleSubmit}>
      <Form.Label>Dodaj gracza</Form.Label>
      <FormGroup
        type="text"
        value={name}
        setValue={setName}
        placeholder="Imię"
        invalid="Podaj imie gracza"
      />
      <FormGroup
        type="number"
        value={index}
        setValue={setIndex}
        placeholder="Który w kolejce"
        invalid="Podaj który w kolejce jest gracz"
      />
      <Button type="submit">Dodaj gracza</Button>
    </Form>
  );
};

export default PlayersForm;
