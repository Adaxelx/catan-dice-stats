import React, { useMemo } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import {
  StyledDiceStats,
  StyledStatDisplay,
  StyledDiceNumber,
  StyledBody,
  StyledStats,
} from "./StatsBoard.css";
import { useTranslation } from "hooks";

const StatsBoard = ({ throws, isExtension }) => {
  const t = useTranslation();
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
              {isExtension ? Math.floor(throws.length / 2) : throws.length}
            </p>
            <StyledDiceStats>
              {throws.map(({ player, value, id }, i) => {
                if ((isExtension && !(i % 2)) || !isExtension)
                  return (
                    <StyledStatDisplay key={id}>
                      <StyledDiceNumber>
                        {isExtension
                          ? `Rzut: ${Math.floor((id + 1) / 2) + 1}`
                          : `Rzut: ${id + 1}`}
                      </StyledDiceNumber>
                      <StyledStats>
                        {isExtension
                          ? `Wynik rzutu: ${value} & ${
                              throws[i + 1]
                                ? t(throws[i + 1]?.value)
                                : "*oczekuje na rzut*"
                            }`
                          : `Wynik rzutu: ${value}`}
                      </StyledStats>
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
