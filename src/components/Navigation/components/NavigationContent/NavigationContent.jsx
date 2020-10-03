import React from "react";
import {
  StyledNavContent,
  StyledList,
  StyledListItem,
} from "components/Navigation/Navigation.css";
import routes from "constants/routes";

const NavigationContent = ({ isOpen, handleClose }) => {
  return (
    <StyledNavContent isOpen={isOpen}>
      <StyledList>
        {routes.map(({ to, name }) => (
          <StyledListItem key={to} to={to} onClick={handleClose}>
            {name}
          </StyledListItem>
        ))}
      </StyledList>
    </StyledNavContent>
  );
};

export default NavigationContent;
