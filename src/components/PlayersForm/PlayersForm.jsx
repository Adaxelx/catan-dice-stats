import React, { useState } from "react";
import { Form, InputGroup, Col, Button } from "react-bootstrap";
import { emptyDiceStats } from "constants/diceNumbers";

const PlayersForm = ({ setPlayers }) => {
  const [validated, setValidated] = useState("");
  const [name, setName] = useState("");
  const [index, setIndex] = useState(1);

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

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
      <Form.Group controlId="name">
        <Form.Control
          required
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Imię"
        />
        <Form.Control.Feedback type="invalid">
          Podaj imie gracza
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="name">
        <Form.Control
          required
          type="number"
          value={index}
          onChange={(e) => {
            const value = e.target.value;
            setIndex(value);
          }}
          placeholder="Który w kolejce"
        />
        <Form.Control.Feedback type="invalid">
          Podaj który w kolejce jest gracz
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Dodaj gracza</Button>
    </Form>
  );
};

export default PlayersForm;
