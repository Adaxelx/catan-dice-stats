import React from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { StyledThrow } from "./HistoryOfThrows.css";

const HistoryOfThrows = ({ history, longestStreak, players }) => {
  return (
    <Accordion>
      <Card.Header className="bg-warning">
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <h5>Historia rzutów</h5>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="p-0">
          <Row className="m-0">
            <Col xs={6}>
              <h4 className="text-center">Liczba oczek</h4>
            </Col>
            <Col xs={6}>
              <h4 className="text-center">Gracz</h4>
            </Col>
          </Row>
          {history.map(({ value, player }, i) => (
            <StyledThrow
              isLongest={
                i >= longestStreak.startIndex &&
                i < longestStreak.startIndex + longestStreak.streak
              }
            >
              <Col xs={6} className="text-center font-weight-bold">
                {value}
              </Col>
              <Col xs={6} className="text-center">
                {players.find((playerVal) => playerVal.index === player)?.name}
              </Col>
            </StyledThrow>
          ))}
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default HistoryOfThrows;
