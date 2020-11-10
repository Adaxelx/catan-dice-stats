import React from "react";
import { StyledBoard, StyledTile } from "./Board.css";
import diceNumbers, { citiesAndKnights } from "constants/diceNumbers";

const Board = ({
  setThrows,
  activePlayer,
  isExtension,
  throws,
  handleSaveToFile,
}) => {
  const handleClick = (id) => {
    setThrows((prevState) => [
      ...prevState,
      { value: id, player: activePlayer, id: prevState.length },
    ]);
    if (throws.length % 3 === 0) {
      handleSaveToFile();
    }
  };

  return (
    <StyledBoard isExtension={isExtension}>
      {diceNumbers.map((number) => (
        <StyledTile
          disabled={isExtension && throws.length % 2}
          onClick={
            isExtension && throws.length % 2
              ? () => {}
              : () => handleClick(number)
          }
          key={number}
        >
          {number}
        </StyledTile>
      ))}{" "}
      {isExtension &&
        citiesAndKnights.map((diceRoll) => (
          <StyledTile
            onClick={
              !(throws.length % 2) ? () => {} : () => handleClick(diceRoll.name)
            }
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
