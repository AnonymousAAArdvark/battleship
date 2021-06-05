import React from "react";
import Battleship from "../scripts/Battleship";
import { ShipWrapper, ShipsContainer, Part } from "./styled_components/DisplayShipsStyles";

type DisplayShipsProps = {
  player: string,
  ships: Battleship[]
};

const DisplayShips = ({player, ships}: DisplayShipsProps) => {
  return (
    <ShipsContainer player={player}>
      {ships.sort((a, b) => a.getLength - b.getLength).map((ship, i) => {
        return(
          <ShipWrapper key={i}>
            {ship.getParts.map((_, j) => {
              if(ship.isSunk()) {
                return <Part sunk={true} key={j} />;
              }
              else {
                return <Part sunk={false} key={j} />;
              }
            })}
          </ShipWrapper>
        )
      })}
    </ShipsContainer>
  );
};

export default DisplayShips;