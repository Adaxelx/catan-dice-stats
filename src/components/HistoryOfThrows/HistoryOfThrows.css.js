import styled from "styled-components";

export const StyledThrow = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ isLongest }) => (isLongest ? "#fdd906" : "white")};
`;
