import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { emptyDiceStats } from "constants/diceNumbers";
import { FormGroup, CardForm } from "../";

const PlayersForm = ({ setPlayers, players }) => {
  const [validated, setValidated] = useState("");

  const [name, setName] = useState("");
  const [index, setIndex] = useState("1");

  useEffect(() => {
    setIndex(players.length + 1);
  }, [players.length]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setPlayers((prevState) => {
        const prevArray = [...prevState, { name, index, buildings: [] }];
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
        disabled
      />

      <Button type="submit">Dodaj gracza</Button>
    </Form>
  );
};

export default PlayersForm;
