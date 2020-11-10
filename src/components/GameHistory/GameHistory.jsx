import React, { useContext } from "react";
import { Accordion, Button, Card, Alert } from "react-bootstrap";
import {
  DiceThrowsStats,
  HistoryOfThrows,
  ResourcesStats,
  PlayerStats,
} from "../";
import { GameContext } from "context";
import { useHistory } from "react-router-dom";
import { useTranslation } from "hooks";

const GameHistory = ({ game, load }) => {
  const gameContext = useContext(GameContext);
  const history = useHistory();
  const t = useTranslation();

  const handleLoadGame = () => {
    gameContext.saveGameStats({
      throws: game.history,
      players: game.players,
      isStarted: true,
      isExtension: game.isExtension,
      queue: game.players,
      isChanged: false,
      gameId: "",
    });

    history.push("/");
  };

  return (
    <Accordion>
      <Card.Header className="d-flex flex-wrap align-items-center justify-content-center">
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <h2>{game.name}</h2>
        </Accordion.Toggle>
        {!load && (
          <Button className="d-inline-block ml-3" onClick={handleLoadGame}>
            {t("Load the game")}
          </Button>
        )}
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="p-0">
          <Alert className="mb-0 py-4 h4 text-warning bg-primary text-center">{`${t(
            "General statistics"
          )}`}</Alert>
          <DiceThrowsStats
            game={game}
            stats={game.stats}
            countOfDiceRolls={game.countOfDiceRolls}
          />
          {!game.old && (
            <>
              <HistoryOfThrows
                isExtension={game.isExtension}
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
