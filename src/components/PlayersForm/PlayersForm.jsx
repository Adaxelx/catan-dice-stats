import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FormGroup } from "../";
import { useTranslation } from "hooks";

const PlayersForm = ({ setPlayers, players }) => {
  const [validated, setValidated] = useState("");
  const [name, setName] = useState("");
  const [index, setIndex] = useState("1");

  const t = useTranslation();

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
      <Form.Label>{t("Add player")}</Form.Label>
      <FormGroup
        type="text"
        value={name}
        setValue={setName}
        placeholder={t("Name")}
        invalid={t("Put player name!")}
      />
      <FormGroup
        type="number"
        value={index}
        setValue={setIndex}
        placeholder={t("Which in queue")}
        disabled
      />

      <Button type="submit">{t("Add player")}</Button>
    </Form>
  );
};

export default PlayersForm;
