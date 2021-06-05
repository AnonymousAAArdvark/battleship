import React, {useState, useEffect, useCallback} from "react";
import Battleship from "../scripts/Battleship";
import Game from "../scripts/Game";
import Gameboard from "../scripts/Gameboard";
import { BoardContainer, Header } from "./styled_components/BoardStyles";

type BoardProps = {
  player: 0 | 1;
  game: Game;
  state: { [state: string]: [number, number][] };
  loop: (loc: [number, number]) => void;
  rotate: (loc: [number, number]) => void;
  move: (from: [number, number], to: [number, number]) => void;
  turn: 0 | 1;
  init: boolean;
  reset: boolean;
};

const Board = ({ player, game, state, loop, rotate, move, turn, init, reset }: BoardProps) => {
  const [active, setActive] = useState<string>("");
  const [marked, setMarked] = useState<Battleship | null>(null);

  const updateTiles = useCallback(() => {
    // adds classes to elements appropriate to their state
    const elements = document.querySelectorAll(
      `.board-tile[data-player="${player}"]`,
    );
    elements.forEach((el) => {
      // first clear all added classes
      el.classList.remove('ship-not-hit');
      el.classList.remove('ship-hit');
      el.classList.remove('ship-sunk');
      el.classList.remove('missed');
      el.classList.remove('marked-origin');
      el.classList.remove('marked');
    });

    if (player === 0) {
      state.shipNotHit.forEach((ship) => {
        const element = document.querySelector(
          `.board-tile[data-x="${ship[0]}"][data-y="${ship[1]}"][data-player="${player}"]`,
        );
        element?.classList.add('ship-not-hit');
      });
    }
    state.shipHit.forEach((ship) => {
      const element = document.querySelector(
        `.board-tile[data-x="${ship[0]}"][data-y="${ship[1]}"][data-player="${player}"]`,
      );
      if(!(game.getPlayer(player).getBoard.getTiles[ship[0]][ship[1]] as Battleship)) {
        return;
      }
      if ((game.getPlayer(player).getBoard.getTiles[ship[0]][ship[1]] as Battleship).isSunk()) {
        element?.classList.add('ship-sunk');
      } else {
        element?.classList.add('ship-hit');
      }
    });

    state.missed.forEach((ship) => {
      const element = document.querySelector(
        `.board-tile[data-x="${ship[0]}"][data-y="${ship[1]}"][data-player="${player}"]`,
      );
      element?.classList.add('missed');
    });

    if (marked && !game.getInit) {
      const origin = marked.getOrigin;
      const offset: [number, number][] = Array.from(
        { length: marked.getLength - 1 },
        (_, k) => (marked.getRotated ? [k + 1, 0] : [0, k + 1]),
      );

      const originElement = document.querySelector(
        `.board-tile[data-x="${origin[0]}"][data-y="${origin[1]}"][data-player="${player}"]`,
      );
      originElement?.classList.add('marked-origin');

      offset.forEach((off) => {
        const element = document.querySelector(
          `.board-tile[data-x="${origin[0] - off[0]}"][data-y="${
            origin[1] - off[1]
          }"][data-player="${player}"]`,
        );
        element?.classList.add('marked');
      });
    }
  }, [game, marked, player, state.missed, state.shipHit, state.shipNotHit])

  const chooseAction = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.target as HTMLDivElement;
    const elX = parseInt(el.getAttribute('data-x') as string, 10);
    const elY = parseInt(el.getAttribute('data-y') as string, 10);

    if (
      player === 1 - turn &&
      player === 1 &&
      game.getInit
    ) {
      loop([elX, elY]);
    } else if (player === 0 && !game.getInit) {
      if (!marked) {
        const tile = game.getPlayer(0).getBoard.getTiles[elX][elY];
        if (typeof tile !== 'boolean') {
          setMarked(tile);
        }
      } else if (marked) {
        const origin = marked.getOrigin;
        if (origin[0] === elX && origin[1] === elY) {
          rotate([elX, elY]);
          removeValid();
          setMarked(null);
        } else {
          move([origin[0], origin[1]], [elX, elY]);
          removeValid();
          setMarked(null);
        }
      }
    }
  }

  const showValid = (e: React.MouseEvent<HTMLDivElement>) => {
    // marks valid tiles for moving or rotating ship
    if (marked) {
      const el = e.target as HTMLDivElement;
      const elX = parseInt(el.getAttribute('data-x') as string, 10);
      const elY = parseInt(el.getAttribute('data-y') as string, 10);
      const origin = marked.getOrigin;

      // offset is different if we mouse over origin tile or not
      let offset: [number, number][];
      if (elX === origin[0] && elY === origin[1]) {
        offset = Array.from({ length: marked.getLength }, (_, k) =>
          marked.getRotated ? [0, k] : [k, 0],
        );
      } else {
        offset = Array.from({ length: marked.getLength }, (_, k) =>
          marked.getRotated ? [k, 0] : [0, k],
        );
      }

      // get valid tiles, but include tiles in place of marked ship
      const boardCopy = new Gameboard(game.getPlayer(0).getBoard.getSize);
      const ships = game.getPlayer(0).getBoard.getShips;
      ships.forEach((ship) => {
        if (
          ship.getOrigin[0] !== origin[0] ||
          ship.getOrigin[1] !== origin[1]
        ) {
          boardCopy.placeShip(ship.getLength, ship.getOrigin, ship.getRotated);
        }
      });
      const valid = boardCopy.getValidTiles;

      // mark tiles
      if (
        offset.every((off) =>
          valid.find(
            (val) => elX - off[0] === val[0] && elY - off[1] === val[1],
          ),
        )
      ) {
        const originElement = document.querySelector(
          `.board-tile[data-x="${elX}"][data-y="${elY}"][data-player="${0}"]`,
        );
        originElement?.classList.add('valid-origin');

        offset.forEach((off) => {
          if (off[0] !== 0 || off[1] !== 0) {
            const element = document.querySelector(
              `.board-tile[data-x="${elX - off[0]}"][data-y="${
                      elY - off[1]
              }"][data-player="${0}"]`,
            );
            element?.classList.add('valid');
          }
        });
      }
      else {
        const originElement = document.querySelector(
          `.board-tile[data-x="${elX}"][data-y="${elY}"][data-player="${0}"]`,
        );
        originElement?.classList.add('invalid-origin');

        offset.forEach((off) => {
          if (off[0] !== 0 || off[1] !== 0) {
            const element = document.querySelector(
              `.board-tile[data-x="${elX - off[0]}"][data-y="${
                elY - off[1]
              }"][data-player="${0}"]`,
            );
            element?.classList.add('invalid');
          }
        });
      }
    }
  }

  const removeValid = () => {
    const elements = document.querySelectorAll(
      `.board-tile[data-player="${0}"]`,
    );
    elements.forEach((el) => {
      el.classList.remove('valid-origin');
      el.classList.remove('valid');
      el.classList.remove('invalid-origin');
      el.classList.remove('invalid');
    });
  }

  useEffect(() => {
    if (!game.getInit) {
      setActive('active');
    } else if (turn === 1 - player) {
      setActive('active');
    } else {
      setActive('');
    }
    updateTiles();
  }, [turn, init, game, player, updateTiles]);

  useEffect(() => {
    if(reset) {
      updateTiles();
    }
  }, [reset, updateTiles]);

  useEffect(() => {
    updateTiles();
  });

  return (
    <BoardContainer>
       <div className={`board-wrapper ${active}`}>
         {game
          .getPlayer(player)
          .getBoard.getTiles.map((row, i) => {
            return (
              <div key={i} className="board-row">
                {row.map((_, j) => {
                  return (
                    <div
                      key={`(${i}, ${j})`}
                      data-x={`${i}`}
                      data-y={`${j}`}
                      data-player={player}
                      className="board-tile"
                      onClick={chooseAction}
                      onMouseMove={showValid}
                      onMouseLeave={removeValid}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
      <Header>{`${game.getPlayer(player).getName} board`}</Header>
    </BoardContainer>
  )
}

export default Board;