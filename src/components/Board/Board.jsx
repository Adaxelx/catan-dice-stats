import React, { useCallback } from "react";
import { StyledBoard, StyledTile } from "./Board.css";
import diceNumbers from "constants/diceNumbers";

const Board = ({ setStats, stats, setHistory }) => {
  const handleClick = (id) => {
    setHistory((prevState) => [...prevState, id]);
    const newObject = { ...stats };
    newObject[id] += 1;
    setStats(newObject);
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
