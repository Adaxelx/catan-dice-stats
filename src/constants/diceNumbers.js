import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faSkull } from "@fortawesome/free-solid-svg-icons";
import brick from "assets/brick.png";
import cloth from "assets/cloth.jpeg";
import coin from "assets/coin.jpeg";
import grain from "assets/grain.png";
import lumber from "assets/lumber.png";
import ore from "assets/ore.png";
import paper from "assets/paper.jpeg";
import sheep from "assets/sheep.png";

const diceNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const buildingsTypes = ["Settlement", "City"];

export const resources = {
  BRICK: "brick",
  SHEEP: "sheep",
  GRAIN: "grain",
  ORE: "ore",
  LUMBER: "lumber",
  PAPER: "paper",
  CLOTH: "cloth",
  COIN: "coin",
};

export const resourcesArray = [
  { name: resources.BRICK, image: brick },
  { name: resources.SHEEP, image: sheep },
  { name: resources.GRAIN, image: grain },
  { name: resources.LUMBER, image: lumber },
  { name: resources.ORE, image: ore },
];

export const resourcesExtension = [
  { name: resources.PAPER, image: paper },
  { name: resources.CLOTH, image: cloth },
  { name: resources.COIN, image: coin },
];
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
