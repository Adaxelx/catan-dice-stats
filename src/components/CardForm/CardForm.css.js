import styled from "styled-components";

export const StyledReourcesContainer = styled.div`
  background-color: #1f3057;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 5px;
  row-gap: 5px;
  justify-items: center;
`;

export const StyledBox = styled.div`
  width: 100%;
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

export const StyledResource = styled.img`
  height: 100%;
  width: 100%;
`;
