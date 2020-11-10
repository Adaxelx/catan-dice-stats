import React, { useContext } from "react";
import {
  StyledNavContent,
  StyledList,
  StyledListItem,
  StyledLanguageBar,
} from "components/Navigation/Navigation.css";
import routes from "constants/routes";
import { GameContext } from "context";
import { Button } from "react-bootstrap";
import { languages } from "constants/translations";
import { useTranslation } from "hooks";

const NavigationContent = ({ isOpen, handleClose }) => {
  const gameContext = useContext(GameContext);
  const t = useTranslation();

  return (
    <StyledNavContent isOpen={isOpen}>
      <StyledLanguageBar>
        <Button
          variant="link"
          onClick={() => gameContext.setLanguage(languages.PL)}
        >
          PL
        </Button>
        <Button
          variant="link"
          onClick={() => gameContext.setLanguage(languages.EN)}
        >
          EN
        </Button>
      </StyledLanguageBar>
      <StyledList>
        {routes.map(({ to, name }) => (
          <StyledListItem key={to} to={to} onClick={handleClose}>
            {t(name)}
          </StyledListItem>
        ))}
      </StyledList>
    </StyledNavContent>
  );
};

export default NavigationContent;
