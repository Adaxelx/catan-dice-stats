import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import {
  StyledDiceStats,
  StyledStatDisplay,
  StyledDiceNumber,
  StyledBody,
  StyledStats,
} from "./StatsBoard.css";
import { useTranslation } from "hooks";

const StatsBoard = ({ throws, isExtension, players }) => {
  const t = useTranslation();
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            {t("Game statistics")}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <StyledBody className="p-0 py-3">
            <p className="text-center">
              {t("Total count of throws")}:{" "}
              {isExtension ? Math.floor(throws.length / 2) : throws.length}
            </p>
            <StyledDiceStats>
              {throws.map(({ player, value, id }, i) => {
                if ((isExtension && !(i % 2)) || !isExtension)
                  return (
                    <StyledStatDisplay key={id}>
                      <StyledDiceNumber>
                        {isExtension
                          ? `${t("Throw")}: ${Math.floor((i + 1) / 2) + 1}`
                          : `${t("Throw")}: ${i + 1}`}
                      </StyledDiceNumber>
                      <StyledStats>
                        {isExtension
                          ? `${t("Count of pips")}: ${value} & ${
                              throws[i + 1]
                                ? t(throws[i + 1]?.value)
                                : `*${t("waiting for throw")}*`
                            }`
                          : `${t("Count of pips")}: ${value}`}
                      </StyledStats>
                      <StyledStats align="right">
                        {t("threw")}{" "}
                        {player?.name
                          ? player.name
                          : players.find(({ index }) => index === player).name}
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
