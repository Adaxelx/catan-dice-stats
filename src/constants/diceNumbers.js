import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faSkull } from "@fortawesome/free-solid-svg-icons";

const diceNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${({ color }) => color};
`;

export const citiesAndKnights = [
  {
    name: "castle__yellow",
    icon: <StyledFontAwesomeIcon icon={faCity} color="yellow" />,
  },
  {
    name: "castle__green",
    icon: <StyledFontAwesomeIcon icon={faCity} color="green" />,
  },
  {
    name: "castle__blue",
    icon: <StyledFontAwesomeIcon icon={faCity} color="blue" />,
  },
  {
    name: "pirat",
    icon: <StyledFontAwesomeIcon icon={faSkull} color="black" />,
  },
];

export const emptyDiceStats = (() => {
  const object = {};
  diceNumbers.map((value) => (object[value] = 0));
  return object;
})();

export default diceNumbers;
