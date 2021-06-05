import React, { useState } from 'react';
import Boards from "./components/Boards";
import Game from "./scripts/Game";
import { Display, DisplayWrapper, Buttons, Header, HeaderWrapper, Title } from "./components/styled_components/AppStyles";
import { FaWater } from "react-icons/all";

const App = () => {
  const ships: number[] = [5, 4, 3, 3, 2];
  const [game, setGame] = useState<Game>(new Game(ships, 10));
  const [display, setDisplay] = useState<string>('Move/Rotate ships');
  const [turn, setTurn] = useState<0 | 1>(game.getTurn);
  const [init, setInit] = useState<boolean>(game.getInit);
  const [reset, setReset] = useState<boolean>(false);

  const updateDisplay = () => {
    if (!game.getInit) {
      setDisplay('Move/Rotate ships');
    } else if (game.getWinner !== -1) {
      setDisplay(`${game.getPlayer(game.getWinner).getName} won!`);
    } else if (game.getInit) {
      setDisplay(`${game.getCurrentPlayer.getName} turn`);
    }
  }

  const updateTurn = () => {
    setTurn(game.getTurn);
    updateDisplay();
  }

  const updateInit = () => {
    setInit(game.getInit);
  }

  const initGame = () => {
    game.init();
    updateDisplay();
    updateInit();
    setReset(false);
  }

  const restartGame = async () => {
    setGame(new Game(ships, 10));
    setReset(true);
    setDisplay("Move/Rotate ships");
    setInit(false);
  }

  return (
    <div className="app">
      <HeaderWrapper>
        <Title>
          <FaWater/><Header>Battleship</Header><FaWater/>
        </Title>
      </HeaderWrapper>
      <DisplayWrapper>
        <Display>
          <h2 className={"display"}>{display}</h2>
        </Display>
      </DisplayWrapper>
      <Boards game={game} updateTurn={updateTurn} turn={turn} init={init} reset={reset} />
      <Buttons>
        {
          !init ? <button className="startGame" type="button" onClick={initGame}>Start Game</button>
          : game.getTurn === 0 || game.getWinner !== -1 ? <button className="startGame" type="button" onClick={restartGame}>Restart Game</button>
            : <button className="startGame disabled" type="button">Restart Game</button>
        }
      </Buttons>
    </div>
  );
}

export default App;
