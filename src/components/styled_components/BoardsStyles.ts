import styled from "styled-components";

const BoardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const BoardContainer = styled.div`
  display: flex;
  padding: 0 4rem 0 4rem;
  gap: 0.5rem;
  position: relative;
`;

export { BoardContainer, BoardsContainer };