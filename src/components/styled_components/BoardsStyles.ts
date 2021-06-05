import styled from "styled-components";

const BoardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4vh;
`;

const BoardContainer = styled.div`
  display: flex;
  padding: 0 6vh 0 6vh;
  gap: 0.5vh;
  position: relative;
`;

export { BoardContainer, BoardsContainer };