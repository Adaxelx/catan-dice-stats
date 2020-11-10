import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
//nav button

export const StyledNavigation = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  height: 1.2rem;
  width: 2rem;
  z-index: 100;
`;

const StyledBar = styled.div`
  height: 0.3rem;
  width: 2rem;
  background-color: black;
  position: absolute;
  transition: 0.5s;
  transform-origin: center;
  ${({ isOpen }) => isOpen && "background-color: red;"}
`;

export const StyledTopBar = styled(StyledBar)`
  top: 0;
  ${({ isOpen }) =>
    isOpen && "transform: rotate(-45deg) translateY(50%); top: 50%;"}
`;

export const StyledMidBar = styled(StyledBar)`
  top: 50%;
  transform: translateY(-50%);
  ${({ isOpen }) => isOpen && "opacity: 0;"}
`;

export const StyledBotBar = styled(StyledBar)`
  bottom: 0;
  ${({ isOpen }) => isOpen && "transform: rotate(45deg) translateY(-50%);"}
`;

// nav content display

const openedContent = css`
  transform: translate(0);
`;

const closeContent = css`
  transform: translateX(100%);
`;

export const StyledNavContent = styled.nav`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  transform-origin: top right;
  ${({ isOpen }) => (isOpen ? openedContent : closeContent)};
`;

export const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const StyledListItem = styled(Link)`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: white;
`;

export const StyledLanguageBar = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;
