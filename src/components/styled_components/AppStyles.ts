import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const Title = styled.div`
  display: flex;
  font-size: 3rem;
  align-items: center;
  border-bottom: 4px solid ${({ theme }) => theme.colors.displayBorder};
  color: ${({ theme }) => theme.colors.displayBorder};

`;

const Header = styled.h1`
  text-align: center;
  padding: .5rem;
  font-size: 3rem;
`;

const DisplayWrapper = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
`;

const Display = styled.div`
  padding: .7rem;
  display: flex;
  border: 2px solid ${({ theme }) => theme.colors.displayBorder};
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.colors.displayBackground};
  
  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;

  .startGame {
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
    padding: .7rem 1.4rem;
    border: 2px solid ${({ theme }) => theme.colors.displayBorder};
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .disabled {
    border: 2px solid gray;
    color: gray;
  }
`;

export { Display, DisplayWrapper, Buttons, Header, HeaderWrapper, Title };