import React from "react";
import { ProgressBar, Accordion, Button, Card, Col } from "react-bootstrap";
import { StyledDiceStat } from "./GameHistory.css";

const GameHistory = ({ game }) => {
  console.log(game);
  return (
    <Accordion>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <h2>{game.name}</h2>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <p>{`Statystyki rzutów (łącznie: ${game.countOfDiceRolls})`}</p>
          {Object.keys(game.stats).map((key) => (
            <div className="d-flex align-items-center mb-1">
              <Col xs={2}>
                <StyledDiceStat>{`${key} (${game.stats[key]})`}</StyledDiceStat>
              </Col>
              <Col xs={10}>
                <ProgressBar
                  striped
                  variant="warning"
                  className="w-100"
                  now={(game.stats[key] / game.countOfDiceRolls) * 100}
                />
              </Col>
            </div>
          ))}
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default GameHistory;
