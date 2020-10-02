import React, { useCallback } from "react";
import { StyledBoard, StyledTile } from "./Board.css";
import diceNumbers from "constants/diceNumbers";

const Board = ({ setThrows, activePlayer }) => {
  const handleClick = (id) => {
    setThrows((prevState) => [
      ...prevState,
      { value: id, player: activePlayer },
    ]);
  };

  return (
    <StyledBoard>
      {diceNumbers.map((number) => (
        <StyledTile onClick={() => handleClick(number)} key={number}>
          {number}
        </StyledTile>
      ))}
    </StyledBoard>
  );
};

export default Board;
