import React, { useMemo } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import {
  StyledDiceStats,
  StyledStatDisplay,
  StyledDiceNumber,
  StyledBody,
} from "./StatsBoard.css";

const StatsBoard = ({ stats, playersCount }) => {
  const countOfDiceRolls = Object.keys(stats)
    .map((key) => stats[key])
    .reduce((acc, number) => acc + number, 0);

  const percentageValue = (value) => {
    if (countOfDiceRolls) {
      return `${Math.floor((value / countOfDiceRolls) * 100)}%`;
    }
    return `0%`;
  };

  const queueCount = countOfDiceRolls / playersCount;
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Statystyki gry
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <StyledBody className="p-0 py-3">
            <p className="text-center">
              Liczba rzutów łącznie: {countOfDiceRolls}
            </p>
            <StyledDiceStats>
              {Object.keys(stats).map((key) => (
                <StyledStatDisplay>
                  <StyledDiceNumber>{key}</StyledDiceNumber>
                  <span>{stats[key]}</span>
                  {percentageValue(stats[key])}
                </StyledStatDisplay>
              ))}
            </StyledDiceStats>
          </StyledBody>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default StatsBoard;
