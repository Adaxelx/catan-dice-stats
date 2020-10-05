import React from "react";
import { ProgressBar, Accordion, Button, Card, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledDiceStat = styled.span`
  white-space: nowrap;
  flex-grow: 1;
`;

const ResourcesStats = ({ stats }) => {
  return (
    <Accordion>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <h5 className="text-dark">{`Statystyki surowców (łącznie: ${stats.total})`}</h5>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="p-0">
          {Object.keys(stats).map(
            (key) =>
              key !== "total" && (
                <div key={key} className="d-flex align-items-center mb-1">
                  <Col xs={4}>
                    <StyledDiceStat>{`${key} (${stats[key].length})`}</StyledDiceStat>
                  </Col>
                  <Col xs={8}>
                    <ProgressBar
                      striped
                      variant="warning"
                      className="w-100"
                      now={(stats[key].length / stats.total) * 100}
                    />
                  </Col>
                </div>
              )
          )}
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default ResourcesStats;
