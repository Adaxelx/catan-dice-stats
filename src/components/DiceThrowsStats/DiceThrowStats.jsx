import React from "react";
import { ProgressBar, Accordion, Button, Card, Col } from "react-bootstrap";
import styled from "styled-components";
import { useTranslation } from "hooks";

const StyledDiceStat = styled.span`
  white-space: nowrap;
  flex-grow: 1;
`;

const DiceThrowsStats = ({ stats, countOfDiceRolls }) => {
  const t = useTranslation();

  return (
    <Accordion>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <h5 className="text-dark">{`${t("Throws stats")} (${t(
            "total"
          )}: ${countOfDiceRolls})`}</h5>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="p-0">
          {Object.keys(stats).map((key) => (
            <div key={key} className="d-flex align-items-center mb-1">
              <Col xs={6}>
                <StyledDiceStat>{`${t(key)} (${stats[key]}) ${Math.round(
                  (stats[key] / countOfDiceRolls) * 100
                )}%`}</StyledDiceStat>
              </Col>
              <Col xs={6}>
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
