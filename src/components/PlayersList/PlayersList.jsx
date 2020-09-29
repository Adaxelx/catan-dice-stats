import React from "react";
import { StyledPlayersList } from "./PlayersList.css";
import { Button } from "react-bootstrap";
const PlayersList = ({ players, setPlayers }) => {
  const handleDelete = (index) => {
    setPlayers((prevState) => {
      const tmp = [...prevState];
      const id = tmp.findIndex((item) => item.index === index);
      tmp.splice(id, 1);
      return tmp;
    });
  };

  return (
    <>
      <h3>Lista graczy</h3>
      <StyledPlayersList>
        {players.map(({ name, index }) => (
          <li className="d-inline-block" key={index}>
            {name}
            <Button
              className="ml-1"
              onClick={() => handleDelete(index)}
              variant="danger"
            >
              X
            </Button>
          </li>
        ))}
      </StyledPlayersList>
    </>
  );
};

export default PlayersList;
