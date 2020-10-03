import React from "react";
import Navigation from "../../Navigation";
import {
  StyledNavigation,
  StyledTopBar,
  StyledBotBar,
  StyledMidBar,
} from "components/Navigation/Navigation.css";

const NavigationButton = ({ isOpen, setIsOpen }) => {
  return (
    <StyledNavigation onClick={() => setIsOpen((prevState) => !prevState)}>
      <StyledTopBar isOpen={isOpen} />
      <StyledMidBar isOpen={isOpen} />
      <StyledBotBar isOpen={isOpen} />
    </StyledNavigation>
  );
};

export default NavigationButton;
