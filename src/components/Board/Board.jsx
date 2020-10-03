import React, { useCallback } from "react";
import { StyledBoard, StyledTile } from "./Board.css";
import diceNumbers, { citiesAndKnights } from "constants/diceNumbers";

const Board = ({ setThrows, activePlayer, isExtension, throws }) => {
  const handleClick = (id) => {
    console.log(id);
    setThrows((prevState) => [
      ...prevState,
      { value: id, player: activePlayer },
    ]);
  };

  return (
    <StyledBoard isExtension={isExtension}>
      {diceNumbers.map((number) => (
        <StyledTile
          disabled={isExtension && throws.length % 2}
          onClick={() => handleClick(number)}
          key={number}
        >
          {number}
        </StyledTile>
      ))}
      {isExtension &&
        citiesAndKnights.map((diceRoll) => (
          <StyledTile
            onClick={() => handleClick(diceRoll.name)}
            key={diceRoll.name}
            disabled={isExtension && !(throws.length % 2)}
          >
            {diceRoll.icon}
          </StyledTile>
        ))}
    </StyledBoard>
  );
};

export default Board;
