import React, { useState, useEffect } from "react";
import Board from "./Board";
import DisplayShips from "./DisplayShips";
import Game from "../scripts/Game";
import Battleship from "../scripts/Battleship";
import { BoardsContainer, BoardContainer } from "./styled_components/BoardsStyles";

type BoardsProps = {
  game: Game;
  updateTurn: () => void;
  turn: 0 | 1;
  init: boolean;
  reset: boolean;
}

const Boards = ({ game, updateTurn, turn, init, reset }: BoardsProps) => {
  const [statePlayer, setStatePlayer] = useState<{[state: string]: [number, number][]}>(
    game.getPlayer(0).getBoard.getBoardStates
  );
  const [stateComputer, setStateComputer] = useState<{[state: string]: [number, number][]}>(
    game.getPlayer(1).getBoard.getBoardStates
  );
  const [shipsPlayer, setShipsPlayer] = useState<Battleship[]>(
    game.getPlayer(0).getBoard.getShips
  );
  const [shipsComputer, setShipsComputer] = useState<Battleship[]>(
    game.getPlayer(1).getBoard.getShips
  );

  const updateStatePlayer = () => {
    setStatePlayer(game.getPlayer(0).getBoard.getBoardStates);
  }

  const updateStateComputer = () => {
    setStateComputer(game.getPlayer(1).getBoard.getBoardStates);
  }

  const updateShipsPlayer = () => {
    setShipsPlayer(game.getPlayer(0).getBoard.getShips);
  }

  const updateShipsComputer = () => {
    setShipsComputer(game.getPlayer(1).getBoard.getShips);
  }

  const loop = async (loc: [number, number]) => {
    function timeout(min: number, max: number) {
      return new Promise((resolve) =>
        setTimeout(resolve, Math.floor(Math.random() * (max - min)) + min),
      );
    }

    if (game.getWinner === -1) {
      const success = game.playerTurn([loc[0], loc[1]]);
      if (success) {
        game.setWinner = game.isWinner();
        updateStateComputer();
        updateShipsComputer();
        updateTurn();
        game.next();
        if (game.getWinner === -1) {
          updateTurn();
          await timeout(500, 2000);
          game.computerTurn();
          game.setWinner = game.isWinner();
          updateTurn();
          game.next();
          updateTurn();
          updateStatePlayer();
          updateShipsPlayer();
        }
      }
    }
  }

  const rotateShip = (loc: [number, number]) => {
    game.getPlayer(0).getBoard.rotateShip(loc);
    updateStatePlayer();
  }

  const moveShip = (from: [number, number], to: [number, number]) => {
    game.getPlayer(0).getBoard.moveShip(from, to);
    updateStatePlayer();
  }

  useEffect(() => {
    if(reset) {
      setStatePlayer(game.getPlayer(0).getBoard.getBoardStates);
      setStateComputer(game.getPlayer(1).getBoard.getBoardStates);
      setShipsPlayer(game.getPlayer(0).getBoard.getShips);
      setShipsComputer(game.getPlayer(1).getBoard.getShips);
    }
  }, [reset, game]);

  return (
    <BoardsContainer>
      <BoardContainer>
        <DisplayShips player="player" ships={shipsPlayer} />
        <Board
          player={0}
          game={game}
          state={statePlayer}
          loop={loop}
          rotate={rotateShip}
          move={moveShip}
          turn={turn}
          init={init}
          reset={reset}
        />
      </BoardContainer>
      <BoardContainer>
        <Board
          player={1}
          game={game}
          state={stateComputer}
          loop={loop}
          rotate={rotateShip}
          move={moveShip}
          turn={turn}
          init={init}
          reset={reset}
        />
        <DisplayShips player="computer" ships={shipsComputer} />
      </BoardContainer>
    </BoardsContainer>
  );
}

export default Boards;