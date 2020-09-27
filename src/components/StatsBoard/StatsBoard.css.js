import styled from "styled-components";
import { Card } from "react-bootstrap";

export const StyledDiceStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  column-gap: 5px;
  row-gap: 5px;
  background-color: #fdd906;
`;

export const StyledStatDisplay = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #1f3057;
  color: white;
`;

export const StyledBody = styled(Card.Body)`
  background-color: #fdd906 !important;
`;

export const StyledDiceNumber = styled.p`
  margin: 0;
  font-size: 1.5rem;
  color: #8fc693;
`;
