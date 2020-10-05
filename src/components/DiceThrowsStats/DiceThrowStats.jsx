import React from "react";
import { ProgressBar, Accordion, Button, Card, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledDiceStat = styled.span`
  white-space: nowrap;
  flex-grow: 1;
`;

const DiceThrowsStats = ({ stats, countOfDiceRolls }) => {
  return (
    <Accordion>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <h5 className="text-dark">{`Statystyki rzutów (łącznie: ${countOfDiceRolls})`}</h5>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="p-0">
          {Object.keys(stats).map((key) => (
            <div key={key} className="d-flex align-items-center mb-1">
              <Col xs={2}>
                <StyledDiceStat>{`${key} (${stats[key]})`}</StyledDiceStat>
              </Col>
              <Col xs={10}>
                <ProgressBar
                  striped
                  variant="warning"
                  className="w-100"
                  now={(stats[key] / countOfDiceRolls) * 100}
                />
              </Col>
            </div>
          ))}
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default DiceThrowsStats;
