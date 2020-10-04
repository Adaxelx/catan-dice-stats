import React from "react";
import { ProgressBar, Accordion, Button, Card, Col } from "react-bootstrap";
import { StyledDiceStat } from "./GameHistory.css";
import {
  DiceThrowsStats,
  HistoryOfThrows,
  ResourcesStats,
  PlayerStats,
} from "../";

const GameHistory = ({ game }) => {
  return (
    <Accordion>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <h2>{game.name}</h2>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="p-0">
          <DiceThrowsStats
            stats={game.stats}
            countOfDiceRolls={game.countOfDiceRolls}
          />
          {!game.old && (
            <>
              <HistoryOfThrows
                history={game.history}
                longestStreak={game.longestStreak}
                players={game.players}
              />
              <ResourcesStats stats={game.resourcesStats} />
              {game.players.map((player) => (
                <PlayerStats player={player} />
              ))}
            </>
          )}
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default GameHistory;
