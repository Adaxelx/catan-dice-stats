import styled from "styled-components";

export const StyledBoard = styled.main`
  background-color: #1f3057;
  height: ${({ isExtension }) =>
    isExtension ? "calc(5 * 15vh + 4 * 5px)" : "calc(4 * 15vh + 3 * 5px)"};
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  column-gap: 5px;
  row-gap: 5px;
`;

export const StyledTile = styled.div`
  width: 100%;
  height: 15vh;
  background-color: ${({ disabled }) => (disabled ? "gray" : "#fdd906")};
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8fc693;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    top: 0;
    left: 0;
    opacity: ${({ isActive }) => (isActive ? 0.6 : 0)};
  }
`;
