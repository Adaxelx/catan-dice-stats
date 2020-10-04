import React from "react";
import { Accordion, Button, Card, Alert } from "react-bootstrap";
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
          <Alert
            variant="success"
            className="mb-0 py-4 h4 text-center"
          >{`Statystki ogólne`}</Alert>
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
                <PlayerStats key={player._id} player={player} />
              ))}
            </>
          )}
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default GameHistory;
