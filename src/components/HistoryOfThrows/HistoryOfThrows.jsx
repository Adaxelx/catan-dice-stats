import React from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { StyledThrow } from "./HistoryOfThrows.css";
import { useTranslation } from "hooks";

const HistoryOfThrows = ({ history, longestStreak, players, isExtension }) => {
  const t = useTranslation();

  return (
    <Accordion>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <h5 className="text-dark">{t("Throws history")}</h5>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="p-0">
          <Row className="m-0">
            <Col xs={7}>
              <h4 className="text-center">{t("Count of pips")}</h4>
            </Col>
            <Col xs={5}>
              <h4 className="text-center">{t("Player")}</h4>
            </Col>
          </Row>
          {history.map(({ value, player, _id: id }, i) => {
            if ((isExtension && !(i % 2)) || !isExtension) {
              return (
                <StyledThrow
                  key={id}
                  isLongest={
                    isExtension
                      ? i / 2 >= longestStreak.startIndex &&
                        i / 2 < longestStreak.startIndex + longestStreak.streak
                      : i >= longestStreak.startIndex &&
                        i < longestStreak.startIndex + longestStreak.streak
                  }
                >
                  <Col xs={7} className=" font-weight-bold">
                    {isExtension
                      ? `${value} & ${t(history[i + 1]?.value)}`
                      : value}
                  </Col>
                  <Col xs={5} className="text-center">
                    {
                      players.find((playerVal) => playerVal.index === player)
                        ?.name
                    }
                  </Col>
                </StyledThrow>
              );
            } else return null;
          })}
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default HistoryOfThrows;
