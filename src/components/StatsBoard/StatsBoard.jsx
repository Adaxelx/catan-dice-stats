import React, { useMemo } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import {
  StyledDiceStats,
  StyledStatDisplay,
  StyledDiceNumber,
  StyledBody,
  StyledStats,
} from "./StatsBoard.css";

const StatsBoard = ({ throws, isExtension }) => {
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
              Liczba rzutów łącznie:{" "}
              {isExtension ? throws.length / 2 : throws.length}
            </p>
            <StyledDiceStats>
              {throws.map(({ player, value }, i) => {
                return (
                  <StyledStatDisplay>
                    <StyledDiceNumber>Rzut: {i + 1}</StyledDiceNumber>
                    <StyledStats>Wynik rzutu: {value}</StyledStats>
                    <StyledStats align="right">
                      Rzucił {player.name}
                    </StyledStats>
                  </StyledStatDisplay>
                );
              })}
            </StyledDiceStats>
          </StyledBody>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default StatsBoard;
