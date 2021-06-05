import styled, { css } from "styled-components";

const ShipsContainer = styled.div<{ player: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: .7rem;
  top: 1rem;
  ${({ player }) => player === "player" && css`
    align-items: flex-end;
    right: 95%;
  `};
  ${({ player }) => player === "computer" && css`
    left: 95%;
  `};
  
  @media (max-width: 1100px) {
    display: none;
  }
  @media (max-width: 920px) {
    display: flex;
  }
  @media (max-width: 550px) {
    display: none;
  }
`;

const ShipWrapper = styled.div`
  display: flex;
  gap: .3rem;
`;

const Part = styled.div<{ sunk: boolean }>`
  width: .7rem;
  height: .7rem;
  background-color: ${props => props.sunk ? ({theme})=>theme.colors.shipSunk : ({theme})=>theme.colors.ship};
`;

export {ShipsContainer, ShipWrapper, Part};